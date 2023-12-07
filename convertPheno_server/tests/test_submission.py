#!/usr/bin/env python3
#
#   tests for running a conversion job
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

from io import BytesIO
from copy import deepcopy

import pytest
from utils import req_post_file, req_post, convert_clinical_data

api_path = "submission"
upload_url_suffix = f"{api_path}/upload"
convert_url_suffix = f"{api_path}/convert"

default_data = {
    "runExampleData": True,
    "uploadedFiles": {},
    "inputFormat": "redcap",
    "outputFormats": {
        "bff": True,
        "pxf": True,
        "omop": False,
    },
}


class TestSubmissionClass:
    @pytest.mark.parametrize("test_client", ["dev_client", "client"], indirect=True)
    def test_upload(self, test_client, header):
        data = dict(
            files=(BytesIO(b"my file contents"), "test.csv"),
        )

        header_modified = deepcopy(header)
        header_modified["X-Custom-InputFormat"] = "redcap"

        res = req_post_file(test_client, header_modified, upload_url_suffix, data)
        assert res.status_code == 200
        assert "tempFilename" in res.json

    # Test below deactivated for now
    def test_convert_wrong_schema(self, client, header):
        data = {
            "inputFormat": "redcap",
            "outputFormats": {
                "bff": True,
                "pxf": True,
                "omop": False,
            },
        }
        res = req_post(client, header, "submission/convert", data=data)
        assert res.status_code == 400
        response = res.json
        assert response["message"] == "Input payload validation failed"
        assert "is a required property" in response["errors"]["runExampleData"]

    def test_convert_redcap_example(self, client, header):
        job_id = convert_clinical_data(client, header, data=default_data)
        assert job_id

    def test_convert_bff_example(self, client, header):
        data = deepcopy(default_data)
        data["inputFormat"] = "bff"
        data["outputFormats"]["bff"] = False
        job_id = convert_clinical_data(client, header, data=data)
        assert job_id

    def test_convert_bff_example_to_bff(self, client, header):
        data = deepcopy(default_data)
        data["inputFormat"] = "bff"
        res = convert_clinical_data(client, header, data=data)
        assert res["message"] == "Input and output format are the same"

    def test_convert_pxf_example(self, client, header):
        data = deepcopy(default_data)
        data["inputFormat"] = "pxf"
        data["outputFormats"]["pxf"] = False
        job_id = convert_clinical_data(client, header, data=data)
        assert job_id

    def test_convert_omop_example(self, client, header):
        data = deepcopy(default_data)
        data["inputFormat"] = "omop"
        data["outputFormats"]["omop"] = False
        job_id = convert_clinical_data(client, header, data=data)
        assert job_id

    def test_convert_cdisc_example(self, client, header):
        data = deepcopy(default_data)
        data["inputFormat"] = "cdisc"
        job_id = convert_clinical_data(client, header, data=data)
        assert job_id
