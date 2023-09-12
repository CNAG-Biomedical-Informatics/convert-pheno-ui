#!/usr/bin/env python3
#
#   API for captcha related operations
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

from flask import request, make_response
from flask_restx import Resource, Namespace
from flask_cors import cross_origin
from server.app import api, app, db

from server.model import User

from server.security import login

cfg = app.config
login_required = cfg["SECURITY"]

ns = Namespace(
    "captcha",
    description="captcha related operations",
    decorators=[cross_origin()],
)

parser = api.parser()
parser.add_argument("Authorization", type=str, location="headers", required=True)


@ns.route("/store", methods=("POST",))
class Captcha(Resource):
    """
    store the captcha token in redis
    """

    @login(login_required)
    @api.expect(parser)
    def post(self, userid):
        """
        store the captcha token in redis
        """

        user = db.session.query(User).filter_by(name=userid).one_or_none()
        if user is None:
            return make_response({"message": "user not found"}, 404)

        # get the token from the request
        token = request.json["token"]
        print("token", token)

        return make_response({"message": "success"}, 200)


ns.add_resource(Captcha, "/store", endpoint="store_captcha")
