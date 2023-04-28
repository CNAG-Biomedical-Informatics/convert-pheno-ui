#!/usr/bin/env python3
#
#   tests for authentication
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

import json
from utils import req_get

class TestAuthClass:
    def test_token(self, client, header):
        res = req_get(client, header, "tokentest")
        assert res.status_code == 200
        response = json.loads(res.data.decode("utf8"))
        assert response["user"] == "test"
