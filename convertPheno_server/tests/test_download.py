#!/usr/bin/env python3
#
#   tests for downloading example data and conversion results
#
#   This file is part of convert-pheno-ui
#
#   Last modified: Dec/08/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license

from copy import deepcopy
from utils import req_post, convert_clinical_data

api_path = "submission"
download_url_suffix = f"{api_path}/download"
download_example_url_suffix = f"{api_path}/download/example"

default_data = {
    "jobId": 1234,
    "tempFilename": "1234.bff.json",
}


class TestDownloadClass:
    def test_download_example_data(self, client, header):
        data = {
            "inputFormat": "redcap",
        }
        res = req_post(client, header, download_example_url_suffix, data=data)
        assert res.status_code == 200
        assert res.mimetype == "application/zip"
        assert res.headers["Content-Disposition"] == "attachment; filename=redcap.zip"

    def test_download_results(self, client, header):
        job_id = convert_clinical_data(client, header)
        data = deepcopy(default_data)
        data["jobId"] = job_id
        res = req_post(client, header, download_url_suffix, data=data)
        assert res.status_code == 200
        assert isinstance(res.data, bytes)
        assert isinstance(res.json, list)
        assert isinstance(res.json[0], dict)

    def test_download_results_user_not_exist(self, client, header_2):
        res = req_post(client, header_2, download_url_suffix, data=default_data)
        assert res.status_code == 404
        assert res.json["message"] == "user not found"

    def test_download_results_job_does_not_exist(self, client, header):
        convert_clinical_data(client, header)
        res = req_post(client, header, download_url_suffix, data=default_data)
        assert res.status_code == 404
        assert res.json["message"] == "job not found"

    def test_download_results_clinical_data_not_found(self, client, header):
        job_id = convert_clinical_data(client, header)
        data = deepcopy(default_data)
        data["jobId"] = job_id
        data["tempFilename"] = "1234.pxf.json"
        res = req_post(client, header, download_url_suffix, data=data)
        assert res.status_code == 404
        assert res.json["message"] == "clinical data not found"

    def test_download_results_user_not_authorized(self, client, header, header_3):
        # Simulate user tries to download the conversion results of another user

        # to create another  user
        convert_clinical_data(client, header_3)

        job_id = convert_clinical_data(client, header)
        data = deepcopy(default_data)
        data["jobId"] = job_id
        res = req_post(client, header_3, download_url_suffix, data=data)
        assert res.status_code == 404
        assert res.json["message"] == "job not found"

    def test_download_all_results(self, client, header):
        data = {
            "runExampleData": True,
            "uploadedFiles": {},
            "inputFormat": "redcap",
            "outputFormats": {
                "bff": True,
                "pxf": True,
                "omop": False,
            },
        }
        job_id = convert_clinical_data(client, header, data)
        data = deepcopy(default_data)
        data["jobId"] = job_id
        data["downloadAllFiles"] = True
        data["tempFilenames"] = [f"{job_id}.bff.json", f"{job_id}.pxf.json"]
        res = req_post(client, header, download_url_suffix, data=data)
        assert res.status_code == 200
