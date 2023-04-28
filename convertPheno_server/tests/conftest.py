#!/usr/bin/env python3
#
#   pytest fixtures
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

import sys
from os import path
import pytest

from server.app import app
from server.model import db

from server.config.config_test import DevelopmentConfig

sys.path.append(path.join(path.dirname(__file__), "helpers"))
from utils import get_header, MyTester  # noqa: E402


@pytest.fixture(scope="session")
def header():
    return get_header("test", DevelopmentConfig)


@pytest.fixture(scope="session")
def header_2():
    return get_header("test2", DevelopmentConfig)


@pytest.fixture()
def client(request):
    app.testing = True  # propagate exceptions to the test client
    app.config.from_object(DevelopmentConfig)
    test_client = app.test_client()

    db.create_all()

    def teardown():
        db.drop_all()
        db.session.remove()

    request.addfinalizer(teardown)
    return test_client


@pytest.fixture
def tester(request):
    """Create tester object"""
    return MyTester(request.param)


@pytest.fixture
def db_uri():
    return DevelopmentConfig.SQLALCHEMY_DATABASE_URI
