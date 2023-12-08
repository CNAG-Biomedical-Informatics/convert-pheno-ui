#!/usr/bin/env python3
#
#   helper functions to generate the json schema of the conversion results
#
#   This file is part of convert-pheno-ui
#
#   Last modified: Dec/08/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license

from genson import SchemaBuilder
from jsonschema import Draft7Validator
from anytree import Node


class JsonSchemaNode(Node):
    def __init__(self, name, parent=None, children=None, value_type=None, node_id=None):
        super().__init__(name, parent=parent, children=children)
        self.value_type = value_type
        self.node_id = node_id


def generate_schema(data):
    builder = SchemaBuilder()
    builder.add_object(data)
    schema = builder.to_schema()

    # TODO
    # add error handling
    Draft7Validator.check_schema(schema)

    return schema


def generate_tree(schema, parent=None, path="", node_id=""):
    if "properties" in schema:
        for idx, (property_name, property_schema) in enumerate(
            schema["properties"].items(), start=1
        ):
            property_path = property_name
            value_type = property_schema.get("type")
            new_node_id = f"{node_id}.{idx}" if node_id else str(idx)
            node = JsonSchemaNode(
                property_path, parent=parent, value_type=value_type, node_id=new_node_id
            )
            generate_tree(property_schema, node, property_path, new_node_id)
    elif "items" in schema:
        items_path = "[]"
        generate_tree(schema["items"], parent, items_path, node_id)
    elif "anyOf" in schema:
        for idx, item in enumerate(schema["anyOf"]):
            if item["type"] != "null":
                items_path = f"{path}"
                generate_tree(schema["anyOf"][idx], parent, items_path, node_id)


def tree_to_dict(node, node_ids=None):
    if node_ids is None:
        node_ids = []

    if node.name == "[]":
        children_dicts = [tree_to_dict(child, node_ids) for child in node.children]
        return {"name": node.name, "children": children_dicts}, node_ids
    else:
        node_dict = {
            "name": node.name,
            "children": [tree_to_dict(child, node_ids)[0] for child in node.children],
            "type": node.value_type,
            "nodeId": node.node_id,
        }
        if node.node_id is not None:
            node_ids.append(node.node_id)
        return node_dict, node_ids


def generate_schema_tree(data):

    schema = generate_schema(data)

    root = JsonSchemaNode("root")
    generate_tree(schema, root)
    node_dict, node_ids = tree_to_dict(root)
    ids_sorted = sorted(node_ids, key=lambda x: tuple(map(int, x.split("."))))
    node_dict["node_ids"] = ids_sorted
    return node_dict
