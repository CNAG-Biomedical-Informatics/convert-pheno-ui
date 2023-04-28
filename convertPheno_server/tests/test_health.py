#!/usr/bin/env python3
#
#   health tests
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

import json

class TestHealthClass:
    def test_health(self, client):
        res = client.get("/api/curltest")
        assert res.status_code == 200
        response = json.loads(res.data.decode("utf8"))
        assert response["curlTest"] == "OK"
