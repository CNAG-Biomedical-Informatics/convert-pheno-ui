#!/usr/bin/env python3
#
#   example config
#
#   This file is part of convert-pheno-ui
#
#   Last modified: Dec/08/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license
from os import environ
from pathlib import Path

db_user = environ.get("API_DB_USER")
db_pw = environ.get("API_DB_PW")
db_host = environ.get("API_DB_HOST")
db_port = environ.get("API_DB_PORT")
db_name = environ.get("API_DB_NAME")
security = environ.get("API_SECURITY")
vscode_debugger = environ.get("DEBUGGER")
cp_container_name = environ.get("CP_CONTAINER_NAME")

# check if all environment variables are set
if None in [db_user, db_pw, db_host, db_port, db_name, security, cp_container_name]:
    raise ValueError(
        "Please set the environment variables:"
        "API_DB_USER, API_DB_PW, API_DB_HOST, API_DB_PORT, API_DB_NAME"
        "API_SECURITY, CP_CONTAINER_NAME"
    )

# throw an error if security is not "true" or "false"
if security not in ["true", "false"]:
    raise ValueError("API_SECURITY must be either 'true' or 'false'")

bool_map = {"true": True, "false": False}


class Config:
    """
    config for convertPheno
    """

    SECURITY = bool_map[security]

    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{db_user}:{db_pw}@{db_host}:{db_port}/{db_name}"
    )

    JWT_OPTIONS = {"verify_exp": False, "verify_aud": False}

    if vscode_debugger and bool_map[vscode_debugger]:
        FLASK_UPLOAD_DIR = Path("../data/uploads/")
        FLASK_EXAMPLE_DIR = Path("../data/example_in/").resolve()
        FLASK_OUT_DIR = Path("../data/output/").resolve()

    CP_CONTAINER_NAME = cp_container_name
