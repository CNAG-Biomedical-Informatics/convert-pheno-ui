#!/usr/bin/env python3
#
#   API for clinical data related operations
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

from copy import deepcopy

import urllib.parse
import base64
import requests

from flask import request, make_response
from flask_restx import Resource, Namespace, fields
from flask_cors import cross_origin

from server.security import login
from server.model import Output, User, Job
from server.app import api, db, app

cfg = app.config
login_required = cfg["SECURITY"]

ns = Namespace(
    "clinical",
    description="clinical data related operations",
    decorators=[cross_origin()],
)

parser = api.parser()
parser.add_argument("Authorization", type=str, location="headers", required=True)


def find_node_by_node_name_get_path(tree, query, path=None):
    """
    Recursively searches the tree for the first node
    that contains a specific node name.
    Returns an empty list if no such node is found.
    """
    if path is None:
        path = []

    node_name = tree.get("name", "")
    if query == node_name:
        return path + [node_name]

    for child in tree.get("children", []):
        result = find_node_by_node_name_get_path(child, query, path + [node_name])
        if result:
            return result

    return []


def get_value_from_nested_dict(nested_dict, paths):
    """
    Gets a value from a nested dictionary given a path.

    Parameters:
    nested_dict (dict): The nested dictionary to search
    path (list): A list of keys representing the path to the value.
    e.g to get the value of nested_dict['a']['b']['c']
        the path would be ['a', 'b', 'c'].

    Returns:
    The value at the given path, or None if the path does not exist.
    """
    current_values = []
    for path in paths:
        current_dict = nested_dict
        if isinstance(path, str):
            path = [path]

        for index, key in enumerate(path):
            if isinstance(current_dict, list):
                if index == len(path) - 1:
                    return [x.get(key).get("label").lower() for x in current_dict]

            if current_dict is None:
                continue

            current_dict = current_dict.get(key)
            if isinstance(current_dict, str):
                current_values.append(current_dict.lower())

    # Concatenate pairs of values from current_values
    output_list = []
    for i in range(len(current_values)):
        for j in range(i + 1, len(current_values)):
            output_list.append(f"{current_values[i]} ({current_values[j]})")
            output_list.append(f"{current_values[j]} ({current_values[i]})")

    current_values.extend(output_list)
    return current_values


def check_criteria(item, criteria, fields_to_json_path, condition_func):
    return all(
        condition_func(
            any(
                value.lower() == s.lower()
                if key == "sex"
                else value.lower() in s.lower()
                for s in get_value_from_nested_dict(item, fields_to_json_path[key])
            )
        )
        for key, value in criteria.items()
    )


def filter_json_array(json_arr, filter_criteria, selected_fields, top_level_to_nodes):
    """Filter out the json array to only include the fields we want"""

    inclusion = filter_criteria["inclusion"]
    exclusion = filter_criteria["exclusion"]

    fields = set(inclusion.keys()).union(set(exclusion.keys()))

    # TODO
    # The logic of how to get the path
    # should not be here but rather when building the tree
    fields_to_json_path = {}
    for field in fields:
        if field in top_level_to_nodes and not top_level_to_nodes[field]["children"]:
            fields_to_json_path[field] = [field]
        else:
            for key, values in selected_fields.items():
                if field in values or field == key:
                    paths = []
                    if field in values:
                        path = find_node_by_node_name_get_path(
                            top_level_to_nodes[key], field
                        )
                        paths.append(path)
                    else:
                        for value in values:
                            path = find_node_by_node_name_get_path(
                                top_level_to_nodes[key], value
                            )
                            paths.append(path)

                    if all(paths):
                        fields_to_json_path[field] = paths
                        break

    filtered_data = []
    for item in json_arr:
        if check_criteria(
            item, inclusion, fields_to_json_path, lambda x: x
        ) and check_criteria(item, exclusion, fields_to_json_path, lambda x: not x):
            filtered_data.append(item)

    return filtered_data


def recursive_search(dictionary, key):
    """
    Recursively searches a dictionary for a key
    and returns the value if found.
    """
    for k, value in dictionary.items():
        if k == key:
            return value
        elif isinstance(value, dict):
            val = recursive_search(value, key)
            if val is not None:
                return val
    return None


def generate_url(ontology_id):
    if ontology_id is None:
        return "NA"

    if ":" not in ontology_id:
        return "NA"

    ont_query = ontology_id.split(":")[1]
    if "NCIT" in ontology_id and ontology_id != "NCIT:NA0000":
        # TODO
        # The NCIT base url should be in a config file
        ncit_base = "https://ncit.nci.nih.gov/ncitbrowser/ConceptReport.jsp"
        ncit_query = f"?dictionary=NCI_Thesaurus&code={ont_query}"
        ncit_url = f"{ncit_base}{ncit_query}"
        return ncit_url

    if "ICD10" in ontology_id:
        icd10_url = f"https://icd.who.int/browse10/2019/en#/{ont_query}"
        return icd10_url

    if "LOINC" in ontology_id:
        loinc_url = f"https://loinc.org/{ont_query}"
        return loinc_url

    if "OPCS4" in ontology_id:
        book_version = "OPCS-4.10"

        search_json_str = (
            f'{{"branches": [],'
            f'"releaseVersions": ["{book_version}"], '
            f'"searchContent": "{ont_query}"}}'
        )
        encoded_url = urllib.parse.quote(search_json_str)
        search_arg_base64 = base64.b64encode(encoded_url.encode()).decode()

        response = requests.get(
            f"https://classbrowser.nhs.uk/bookdoc/search/{book_version}",
            headers={"searchArg-base64": search_arg_base64},
        )
        response_json = response.json()

        opcs_id = response_json["children"][0]["children"][0]["children"][0]["id"]
        url_suffix = opcs_id.replace("#", "+")
        opcs4_url = f"https://classbrowser.nhs.uk/#/book/{url_suffix}"
        return opcs4_url

    if "SNOMED" in ontology_id:
        snomed_base = "https://browser.ihtsdotools.org/"
        snomed_query = f"?perspective=full&conceptId1={ont_query}"
        snomed_suffix = "&edition=MAIN&release=&languages=en"
        snomed_url = f"{snomed_base}{snomed_query}{snomed_suffix}"
        return snomed_url

    if "RxNorm" in ontology_id:
        rxnorm_base = "https://mor.nlm.nih.gov/RxNav/"
        rxnorm_url = f"{rxnorm_base}search?searchBy=RXCUI&searchTerm={ont_query}"
        return rxnorm_url

    if "MONDO" in ontology_id:
        mondo_base = "https://www.ebi.ac.uk/ols4/ontologies/mondo/classes/"
        mondo_query = f"http%3A%2F%2Fpurl.obolibrary.org%2Fobo%2FMONDO_{ont_query}"
        mondo_url = f"{mondo_base}{mondo_query}"
        return mondo_url

    if "OMIM" in ontology_id:
        omim_url = f"https://omim.org/entry/{ont_query}"
        return omim_url

    if "DrugCentral" in ontology_id:
        drugcentral_url = f"http://drugcentral.org/drugcard/{ont_query}"
        return drugcentral_url

    if "CHEBI" in ontology_id:
        chebi_url = f"https://www.ebi.ac.uk/chebi/searchId.do?chebiId={ont_query}"
        return chebi_url

    if "HP" in ontology_id:
        hp_url = f"https://hpo.jax.org/app/browse/term/HP:{ont_query}"
        return hp_url

    # TODO
    # if NA then render a URL pointing to the Github of Convert-Pheno-UI
    # and redirect to Github with a SweepAI issue template
    # https://sweep.dev/

    return "NA"


def parse_meta_info(meta, field):
    """
    Parse the meta info from the json array
    """
    data = []
    nested_info = ["value", "status"]
    values = []
    ontology_ids = []
    urls = []

    ontology_ids_mapping = {}
    urls_mapping = {}

    # TODO
    # create an ontology ids mapping dictionary

    # so it not only gets the ontology ids for the basic table
    # but also for the pop-over tables

    for meta_data in meta:
        meta_row = {}
        for key in meta_data:
            if isinstance(meta_data[key], dict):
                value = recursive_search(meta_data[key], "label")
                ontology_id = recursive_search(meta_data[key], "id")

                ncit_url = generate_url(ontology_id)

                meta_row[key] = value
                if key == field[0] or key in field[0]:
                    values.append(value)
                    ontology_ids.append(ontology_id)
                    urls.append(ncit_url)

                if key in ontology_ids_mapping:
                    ontology_ids_mapping[key].append(ontology_id)
                    urls_mapping[key].append(ncit_url)
                else:
                    ontology_ids_mapping[key] = [ontology_id]
                    urls_mapping[key] = [ncit_url]

                for info in nested_info:
                    nested_info_val = recursive_search(meta_data[key], info)
                    if nested_info_val is not None:
                        meta_row[f"{key}_{info}"] = nested_info_val
            else:
                meta_row[key] = meta_data[key]
        data.append(meta_row)
    return data, values, ontology_ids, urls, ontology_ids_mapping, urls_mapping


def catch_errors(func):
    def wrapper(row, key, *args, **kwargs):
        try:
            return func(row, key, *args, **kwargs)
        except Exception as e:
            print(f"An error occurred: {e}")
            print(f"An error occurred at key '{key}': {e}")
            print(f"in row: {row}")
            return {}

    return wrapper


@catch_errors
def get_basic_row(row, key, selected_fields):
    row_data = {}

    contains_dict = any(isinstance(field, dict) for field in selected_fields[key])
    if not contains_dict and set(selected_fields[key]) == {"id", "label"}:
        row_data[key] = {
            "data": row[key]["label"],
            "count": 1,
            "values": [row[key]["label"]],
            "ontology_ids": [row[key]["id"]],
            "urls": [generate_url(row[key]["id"])],
        }
        return row_data

    if isinstance(row[key], dict):
        for field in selected_fields[key]:
            if isinstance(field, dict):
                for sub_key, values in field.items():
                    for value in values:
                        row_data[sub_key] = row[key][sub_key][value]
            else:
                row_data[field] = row[key][field]
        return row_data

    if len(selected_fields[key]) == 0:
        row_data[key] = row[key]
        return row_data

    # TODO
    # when OMOP -> BFF/PXF
    # parse_meta_info fails for the key phenotypicFeatures
    # -> list index out of range

    data, values, ontology_ids, urls, onts_mapping, urls_mapping = parse_meta_info(
        row[key], selected_fields[key]
    )

    row_data[key] = {
        "data": data,
        "count": len(row[key]),
        "values": values,
        "ontology_ids": ontology_ids,
        "urls": urls,
        "ontology_ids_mapping": onts_mapping,
        "urls_mapping": urls_mapping,
    }
    return row_data


def return_basic_table_row(idx, row, table_config, selected_fields):
    row_data = deepcopy(table_config["row_data_default"])

    key_to_remove = []
    for row_key in row_data:
        if row_key not in selected_fields:
            key_to_remove.append(row_key)

    for key in key_to_remove:
        del row_data[key]

    row_data["#"] = idx + 1
    for key in row:
        if key not in selected_fields:
            continue

        row_data_new = get_basic_row(row, key, selected_fields)
        if row_data_new:
            row_data.update(row_data_new)
        else:
            pass
            # TODO
            # show an error to the user that the data output could
            # not be parsed correctly
    return row_data


def find_node_by_substring(tree, substring):
    """
    Recursively searches the tree for the first node
    that contains a substring.
    Returns None if no such node is found.
    """
    node_name = tree.get("name", "")
    if substring in node_name:
        return tree
    for child in tree.get("children", []):
        result = find_node_by_substring(child, substring)
        if result is not None:
            return result
    return None


def find_node_by_node_name(tree, query):
    """
    Recursively searches the tree for the first node
    that contains a specific node name.
    Returns None if no such node is found.
    """
    node_name = tree.get("name", "")
    if query == node_name:
        return tree
    for child in tree.get("children", []):
        result = find_node_by_node_name(child, query)
        if result is not None:
            return result
    return None


def traverse_until_deepest_leaf(node, path_dict, path=[]):
    path.append(node["name"])
    if node is not None:
        if len(node["children"]) == 0:
            key = path[0]  # Use the root node name as the key
            path_dict[key] = path[1:]  # Use the rest of the path as the value
        else:
            for child in node["children"]:
                traverse_until_deepest_leaf(child, path_dict, path)

    # Remove current node name from the path before returning
    path.pop()


filter_schema = api.schema_model(
    "FilterSchema",
    {
        "type": "object",
        "properties": {
            "inclusion": {
                "type": "object",
                "properties": {},
            },
            "exclusion": {"type": "object", "properties": {}},
        },
    },
)

shown_columns_schema = api.schema_model(
    "ShownColumnsSchema",
    {
        "type": "object",
        "properties": {},
    },
)

resource_fields = api.model(
    "ClinicalDataView",
    {
        "phenoFormat": fields.String(required=True),
        "jobId": fields.String(required=True),
        "shownColumns": fields.Nested(shown_columns_schema, required=False),
        "filter": fields.Nested(filter_schema, required=False),
    },
    strict=True,
)

# TODO
# test which makes sure that
# only the POST request is allowed


@ns.route("/json", methods=("POST",))
class ClinicalDataView(Resource):
    @login(login_required)
    @api.expect(parser, resource_fields, validate=True)
    @api.doc(responses={200: "Success", 400: "Validation Error"})
    def post(self, userid, **kwargs):
        user = db.session.query(User).filter_by(name=userid).one_or_none()
        if user is None:
            return {"message": "User not found"}, 404

        data = request.get_json()

        clinical_format = data["phenoFormat"]
        job_id = data.get("jobId")

        job = (
            db.session.query(Job).filter_by(job_id=job_id, owner=user.id).one_or_none()
        )
        if job is None:
            return {"message": "job not found"}, 404

        if job.errors:
            return {"message": "job has errors", "errors": job.errors}, 500

        output = (
            db.session.query(Output)
            .filter_by(job_id=job.id, target_format=clinical_format)
            .with_entities(Output.data, Output.json_schema)
            .one_or_none()
        )
        if output is None:
            return {"message": "clinical data not found"}, 404

        json_arr, json_schema_tree = output

        # TODO
        # maybe it is better to directly have the
        # top_level_to_nodes dictionary in the database
        top_level_to_nodes = {}
        for node_collection in json_schema_tree["children"]:
            top_level_to_nodes[node_collection["name"]] = node_collection

        interesting_tree_data = []
        node_to_selected = {}
        selected_fields = {}

        shown_cols = data.get("shownColumns")
        filter_criteria = data.get(
            "filter",
            {
                "inclusion": {},
                "exclusion": {},
            },
        )
        table_config = deepcopy(cfg["CLINICAL_DATA_COLS"][clinical_format])

        selected_cols = deepcopy(shown_cols)
        default_cols = table_config["default_cols"]
        default_order = table_config["default_order"]

        # TODO this should not be hardcoded here
        # better change the dictionary "CLINICAL_DATA_COLS"
        if job.input_format == "pxf" and job.target_formats[0] == "bff":
            default_cols.pop("info", None)
            default_cols.pop("exposures", None)
            default_cols.pop("ethnicity", None)
            default_cols["karyotypicSex"] = []

            pos_of_sex = default_order.index("sex")
            default_order.insert(pos_of_sex + 1, "karyotypicSex")

        if job.input_format == "bff" and job.target_formats[0] == "pxf":
            default_cols.pop("phenotypicFeatures", None)

        if job.input_format == "omop" and "bff" in job.target_formats:
            default_cols.pop("info", None)
            default_cols.pop("exposures", None)
            default_cols.pop("measures", None)

        if job.input_format == "omop" and "pxf" in job.target_formats:
            default_cols.pop("measurements", None)

        if not shown_cols:
            selected_cols = deepcopy(default_cols)

        key_to_subkey = table_config["key_to_subkey"]
        new_default_cols = deepcopy(default_cols)
        if key_to_subkey:
            for col in default_cols:
                if col in key_to_subkey:
                    new_default_cols[col] = key_to_subkey[col]
                    if col in selected_cols and len(selected_cols[col]) == 0:
                        selected_cols[col] = key_to_subkey[col]

        for col in new_default_cols:
            field_of_interest = col

            if field_of_interest not in top_level_to_nodes:
                continue

            top_level_node = top_level_to_nodes[field_of_interest]

            # initialize the new nodes for the filtered down tree
            node_id = top_level_node["nodeId"]
            col_is_selected = col in selected_cols
            node_to_selected[node_id] = col_is_selected

            new_node = deepcopy(top_level_node)
            new_node["children"] = []

            new_children = []

            top_level_node_children = top_level_node["children"]
            if len(top_level_node_children) == 0:
                interesting_tree_data.append(new_node)
                if col_is_selected:
                    selected_fields[field_of_interest] = []
                continue

            if {child["name"] for child in top_level_node_children} == {
                "id",
                "label",
            }:
                # below commented out because the child variable
                # is assigned but never used
                # child = find_node_by_node_name(top_level_node, "id")
                interesting_tree_data.append(new_node)
                if col_is_selected:
                    selected_fields[field_of_interest] = ["id", "label"]
                continue

            # used when a field has specified subfields
            # better put it in a separate function
            if new_default_cols[col]:
                values = new_default_cols[col]

                if col_is_selected:
                    selected_fields[field_of_interest] = []

                for value in values:
                    child = find_node_by_node_name(
                        top_level_to_nodes[field_of_interest], value
                    )
                    if child is None:
                        continue

                    selected_col = selected_cols.get(field_of_interest)
                    if len(child["children"]) == 0:
                        new_children.append(child)
                        if selected_col and value in selected_col:
                            selected_fields[field_of_interest].append(value)
                        continue

                    if selected_col and value in selected_col:
                        path_dict = {}
                        traverse_until_deepest_leaf(child, path_dict)
                        selected_fields[field_of_interest].append(path_dict)

                    child["children"] = []
                    new_children.append(child)

                if len(new_children) > 1 and default_cols[col]:
                    new_node["children"] = new_children
                    selected_fields_flattened = []
                    if field_of_interest in selected_fields:
                        for selected_field in selected_fields[field_of_interest]:
                            if isinstance(selected_field, str):
                                selected_fields_flattened.append(selected_field)
                            else:
                                selected_fields_flattened.extend(selected_field.keys())
                        for new_child in new_children:
                            if (
                                field_of_interest in selected_fields
                                and new_child["name"] in selected_fields_flattened
                            ):
                                node_to_selected[new_child["nodeId"]] = True

                interesting_tree_data.append(new_node)
                continue

            fields_to_substrings = cfg["CLINICAL_DATA_COLS"][clinical_format][
                "fields_to_substring"
            ]
            if fields_to_substrings:
                subfield_should_contain = None
                for field_to_substrings in fields_to_substrings:
                    if field_of_interest in field_to_substrings[0]:
                        subfield_should_contain = field_to_substrings[1]

                if subfield_should_contain:
                    child = find_node_by_substring(
                        top_level_node, subfield_should_contain
                    )
                    new_children.append(child)
                    interesting_tree_data.append(new_node)

                    if col_is_selected:
                        selected_fields[field_of_interest] = [child["name"]]

                if len(new_children) > 1:
                    new_node["children"] = new_children

                    for new_child in new_children:
                        new_child_id = new_child["nodeId"]
                        new_child_name = new_child["name"]
                        # if new_child_name in selected_fields[key]:
                        if new_child_name in selected_fields[col]:
                            node_to_selected[new_child_id] = True

        to_be_filtered = any(
            isinstance(val, dict) and bool(val) for val in filter_criteria.values()
        )
        if to_be_filtered:
            json_arr = filter_json_array(
                json_arr,
                filter_criteria,
                selected_fields,
                top_level_to_nodes,
            )

        column_order = default_order
        headers = []
        selected_cols_flattened = [
            item for sublist in list(selected_cols.values()) for item in sublist if item
        ]
        for col in column_order:
            if col in selected_cols or col in selected_cols_flattened:
                headers.append(col)

        rows = []
        for idx, row in enumerate(json_arr):
            row_data = return_basic_table_row(idx, row, table_config, selected_fields)
            rows.append(row_data)

        response = {
            "json": rows,
            "colHeaders": headers,
            "colTree": interesting_tree_data,
            "colNodeIds": list(node_to_selected.keys()),
            "shownColumns": selected_cols,
            "nodeToSelected": node_to_selected,
        }
        return make_response(response)


ns.add_resource(ClinicalDataView, "/json", endpoint="clinical_data_view")
