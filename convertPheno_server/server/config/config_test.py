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
from os import environ
from dotenv import load_dotenv

# BUG
# looks like it is not using this file
# because changing the TEST_DB_HOST IP in the .env
# does not change the IP used in the test
# it is still using the IP from API_DB_HOST

load_dotenv()
db_user = environ.get("TEST_DB_USER")
db_pw = environ.get("TEST_DB_PW")
db_host = environ.get("TEST_DB_HOST")
db_port = environ.get("TEST_DB_PORT")
db_name = environ.get("TEST_DB_NAME")


class DevelopmentConfig:

    """
    config for convertPheno
    """

    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{db_user}:{db_pw}@{db_host}:{db_port}/{db_name}"
    )

    JWT_OPTIONS = {"verify_exp": False, "verify_aud": False}

    AUTH_BASE_URL = environ.get("KC_HOSTNAME_URL")
    AUTH_REALM = environ.get("KC_REALM")
    AUTH_CLIENT = environ.get("KC_CLIENT_ID")
    AUTH_PW = environ.get("KC_TEST_PASSWORD")
    TOKEN_URL = f"{AUTH_BASE_URL}/realms/{AUTH_REALM}/protocol/openid-connect/token"

    # flask
    convertPheno_mountpoint = environ.get("CONVERTPHENO_DATA_MOUNTPOINT")
    if convertPheno_mountpoint == "convert-pheno-ui":
        data_dir = Path.cwd().parent / "data"
    else:
        data_dir = Path.cwd() / "data"

    FLASK_UPLOAD_DIR = data_dir / "uploads"
    FLASK_EXAMPLE_DIR = data_dir / "example_in"
    FLASK_OUT_DIR = data_dir / "output"
