#!/usr/bin/env python3
#
#   tests for authentication
#
#   This file is part of convert-pheno-ui
#
#   Last modified: Dec/08/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license

import json
from utils import req_get
from flask import Flask
import jwt

from server.security import login

app = Flask(__name__)
FAKE_PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\nMIIB-----END PUBLIC KEY-----\n"


class TestAuthClass:
    def test_token(self, client, header):
        res = req_get(client, header, "tokentest")
        assert res.status_code == 200
        response = json.loads(res.data.decode("utf8"))
        assert response["user"] == "test"

    def test_decorator_login_required(self, mocker, fake_public_key, fake_payload):
        mocker.patch("server.security.get_public_key", return_value=fake_public_key)
        mocker.patch("jwt.decode", return_value=fake_payload)

        # Define a dummy function to be decorated
        def dummy_function(*args, **kwargs):
            return "Success!"

        # Get the actual decorator by calling login with required arguments
        decorator = login(login_required=True)

        # Decorate the dummy function with login
        protected_function = decorator(dummy_function)

        # Test with a valid token
        token = "a_valid_token"
        with app.test_request_context(headers={"Authorization": token}):
            response = protected_function()

        assert response == "Success!"

        # Test with an invalid token
        mocker.patch("jwt.decode", side_effect=jwt.InvalidTokenError("Invalid token"))
        token = "an_invalid_token"
        with app.test_request_context(headers={"Authorization": token}):
            response, status_code = protected_function()
        # response, status_code = protected_function(token=token)

        assert (
            response["message"]
            == "Something went wrong Invalid token InvalidTokenError"
        )
        assert status_code == 500

        # Test with no token provided
        with app.test_request_context():
            response, status_code = protected_function()
        # response, status_code = protected_function()

        assert response["message"] == "No token provided"
        assert status_code == 401
