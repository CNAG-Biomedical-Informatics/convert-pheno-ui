#!/usr/bin/env python3
#
#   example config for testing purposes
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

from pathlib import Path

class DevelopmentConfig(object):

    """
    config for convertPheno
    """

    # postgres
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:postgres@10.10.0.3:5432/postgres"

    # jwt
    SECRET_KEY = "othrt-some-secret-string"
    JWT_SECRET_KEY = "jwt-secret-string"
    JWT_OPTIONS = {"verify_exp": False, "verify_aud": False}

    # keycloak
    AUTH_BASE_URL = "https://convertpheno.dev/auth"
    AUTH_REALM = "convertPheno"
    CLIENT = "convert-pheno"
    PASSWORD = "1234"
    TOKEN_URL = f"{AUTH_BASE_URL}/realms/{AUTH_REALM}/protocol/openid-connect/token"

    # flask
    path_prefix = "server"
    FLASK_UPLOAD_DIR = Path(f"{path_prefix}/data/uploads/")
    FLASK_EXAMPLE_DIR = Path(f"{path_prefix}/data/example_in/").resolve()
    FLASK_OUT_DIR = Path(f"{path_prefix}/data/output/").resolve()
