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
from os import environ

db_user = environ.get("API_DB_USER")
db_pw = environ.get("API_DB_PW")
db_host = environ.get("API_DB_HOST")
db_port = environ.get("API_DB_PORT")
db_name = environ.get("API_DB_NAME")


class Config:

    """
    config for convertPheno
    """

    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://{db_user}:{db_pw}@{db_host}:{db_port}/{db_name}"
    )

    JWT_OPTIONS = {"verify_exp": False, "verify_aud": False}
