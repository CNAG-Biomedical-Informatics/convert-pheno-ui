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

# import order matters
from server.config.config_test import DevelopmentConfig
from server.app import app
from server.model import db

sys.path.append(path.join(path.dirname(__file__), "helpers"))
from utils import get_header, MyTester  # noqa: E402

FAKE_PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\nMIIB-----END PUBLIC KEY-----\n"
FAKE_PAYLOAD = {
    "iat": 1619824766,
    "preferred_username": "test",
}


@pytest.fixture()
def fake_public_key():
    return FAKE_PUBLIC_KEY


@pytest.fixture()
def fake_payload():
    return FAKE_PAYLOAD


@pytest.fixture(scope="session")
def header():
    return get_header("test", DevelopmentConfig)


@pytest.fixture(scope="session")
def header_2():
    return get_header("test2", DevelopmentConfig)


@pytest.fixture(autouse=True)
def app_context():
    with app.app_context():
        yield


@pytest.fixture()
def client():
    app.testing = True  # propagate exceptions to the test client
    app.config.from_object(DevelopmentConfig)

    db.create_all()

    yield app.test_client()

    db.drop_all()
    db.session.remove()


@pytest.fixture()
def mock_client(mocker):
    app.testing = True  # propagate exceptions to the test client
    app.config.from_object(DevelopmentConfig)

    mocker.patch("server.security.get_public_key", return_value=FAKE_PUBLIC_KEY)
    mocker.patch("jwt.decode", return_value=FAKE_PAYLOAD)

    yield app.test_client()


@pytest.fixture(params=["mock_client", "client"])
def test_client(request):
    client_fixture = request.getfixturevalue(request.param)
    yield client_fixture


@pytest.fixture
def tester(request):
    """Create tester object"""
    return MyTester(request.param)


@pytest.fixture
def db_uri():
    return DevelopmentConfig.SQLALCHEMY_DATABASE_URI
