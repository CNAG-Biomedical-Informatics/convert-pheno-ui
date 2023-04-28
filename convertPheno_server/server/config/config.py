#!/usr/bin/env python3
#
#   example config
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

class Config(object):

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
