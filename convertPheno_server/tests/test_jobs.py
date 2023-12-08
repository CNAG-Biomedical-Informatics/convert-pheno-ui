#!/usr/bin/env python3
#
#   tests for getting the conversion job data
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license

from utils import req_post, convert_clinical_data

api_path = "jobs"
job_url_suffix = f"{api_path}/job"


class TestJobsClass:
    def test_job_data(self, client, header):
        job_id = convert_clinical_data(client, header)
        data = {
            "jobId": job_id,
        }
        res = req_post(client, header, job_url_suffix, data=data)
        assert res.status_code == 200
        response = res.json
        assert response["message"] == "Job data retrieved successfully"
        job_data = response["data"]
        assert job_data
        expected_keys = ["inputFormat", "outputFormats", "tempFilenames", "jobId"]
        assert all(key in job_data for key in expected_keys)
