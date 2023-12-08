#!/usr/bin/env python3
#
#   tests for interacting with the clinical endpoint
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license

from copy import deepcopy
from utils import req_post, convert_clinical_data, filter_by_criteria

url_root = "/api/"
url_suffix = "clinical/json"

default_data = {
    "phenoFormat": "bff",
    "jobId": "1234",
}

default_filter = {
    "inclusion": {},
    "exclusion": {},
}


class TestClinicalClass:
    def test_conversion_results_user_not_exist(self, client, header):
        res = req_post(client, header, url_suffix, data=default_data)
        assert res.status_code == 404
        assert res.json["message"] == "User not found"

    def test_conversion_results(self, client, header):
        job_id = convert_clinical_data(client, header)
        data = deepcopy(default_data)
        data["jobId"] = str(job_id)
        res = req_post(client, header, url_suffix, data=data)
        assert res.status_code == 200
        expected_keys = [
            "json",
            "colHeaders",
            "colTree",
            "colNodeIds",
            "shownColumns",
            "nodeToSelected",
        ]
        assert all(key in res.json for key in expected_keys)

    def test_conversion_job_not_exist(self, client, header):
        convert_clinical_data(client, header)
        data = deepcopy(default_data)
        data["jobId"] = "1234"
        res = req_post(client, header, url_suffix, data=data)
        assert res.status_code == 404
        assert res.json["message"] == "job not found"

    def test_conversion_clinical_data_not_found(self, client, header):
        job_id = convert_clinical_data(client, header)
        data = deepcopy(default_data)
        data["jobId"] = str(job_id)
        data["phenoFormat"] = "pxf"
        res = req_post(client, header, url_suffix, data=data)
        assert res.status_code == 404
        assert res.json["message"] == "clinical data not found"

    def test_conversion_results_wrong_schema(self, client, header):
        data = deepcopy(default_data)
        del data["phenoFormat"]
        res = req_post(client, header, url_suffix, data=data)
        assert res.status_code == 400
        assert res.json["message"] == "Input payload validation failed"


class TestClinicalFilteringClass:
    def test_filter_by_exact_match(self, client, header):
        # scenario
        # certain fields can only be filtered by an exact match
        # example: sex; allowed values:"Male","Female"

        expected_val = "Male"
        filter_criteria = ["inclusion", "sex", "Male"]
        filter_by_criteria(client, header, url_suffix, filter_criteria, expected_val)

        disallowed_val = "Female"
        filter_criteria = ["exclusion", "sex", "Female"]
        filter_by_criteria(client, header, url_suffix, filter_criteria, disallowed_val)

    def test_filter_by_partial_match(self, client, header):
        expected_val = "Caucasian"
        filter_criteria = ["inclusion", "ethnicity", "Cauca"]
        filter_by_criteria(client, header, url_suffix, filter_criteria, expected_val)

        disallowed_val = "Caucasian"
        filter_criteria = ["exclusion", "ethnicity", "Cauca"]
        filter_by_criteria(client, header, url_suffix, filter_criteria, disallowed_val)


class TestClinicalColumnsSelections:
    def test_select_columns(self, client, header):
        # TODO implement this test

        job_id = convert_clinical_data(client, header)
        data = deepcopy(default_data)
        data["jobId"] = str(job_id)
        data["shownColumns"] = {"info": ["redcap_event_name", "study_id"]}

        res = req_post(client, header, url_suffix, data=data)
        assert res.status_code == 200
