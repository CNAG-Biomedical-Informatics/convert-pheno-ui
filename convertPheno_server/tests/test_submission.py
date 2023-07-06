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
import pytest
from utils import req_post_file, convert_clinical_data

api_path = "submission"
upload_url_suffix = f"{api_path}/upload"
convert_url_suffix = f"{api_path}/convert"


class TestSubmissionClass:
    @pytest.mark.parametrize("test_client", ["dev_client", "client"], indirect=True)
    def test_upload(self, test_client, header):
        data = dict(
            files=(BytesIO(b"my file contents"), "test.csv"),
        )
        res = req_post_file(test_client, header, upload_url_suffix, data)
        assert res.status_code == 200
        assert "tempFilename" in res.json

    def test_convert_redcap_example(self, client, header):
        data = {
            "runExampleData": True,
            "inputFormat": "redcap",
            "outputFormats": {
                "bff": True,
                "pxf": True,
            },
        }
        job_id = convert_clinical_data(client, header, data=data)
        assert job_id
