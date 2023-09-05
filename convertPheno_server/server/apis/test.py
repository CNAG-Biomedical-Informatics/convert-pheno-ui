#!/usr/bin/env python3
#
#   API for testing purposes if the API is accessible
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

"""
For testing if Flask can be accessed from the frontend
"""

from flask_restx import Resource, Namespace
from flask_cors import cross_origin

from server.security import login
from server.app import api, app

ns = Namespace(
    "test", description="test related operations", decorators=[cross_origin()]
)

cfg = app.config
login_required = cfg["SECURITY"]

parser = api.parser()
parser.add_argument("Authorization", type=str, location="headers", required=True)


@ns.route("/curltest", methods=("GET",))
class CurlTest(Resource):
    def get(self):
        """
        To test curl access
        """
        return {"curlTest": "OK"}


@ns.route("/tokentest", methods=("GET",))
class TokenTest(Resource):
    """
    API endpoint to test if the token is found and returns
    the userid and its associated groups
        - userid = Keycloak id of the user
    """

    @login(login_required)
    @api.expect(parser)
    def get(self, userid):
        return {"user": userid}
