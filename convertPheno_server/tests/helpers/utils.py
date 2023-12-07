#!/usr/bin/env python3
#
#   helper functions for testing
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

from pathlib import Path
import requests

import json
import gzip
from io import BytesIO

from sqlalchemy import create_engine, Column
from sqlalchemy.orm import Session

url_root = "/api/"


def exception_handler(func):
    def inner_function(*args, **kwargs):
        res = func(*args, **kwargs)
        if res.status_code in [200, 400, 404, 405]:
            return res

        return json.loads(res.data.decode("utf8"))

    return inner_function


@exception_handler
def req_get(client, header, url_suffix):
    return client.get(url_root + url_suffix, headers=header)


@exception_handler
def req_post(client, header, url_suffix, data):
    return client.post(url_root + url_suffix, headers=header, data=json.dumps(data))


@exception_handler
def req_del(client, header, url_suffix, data):
    return client.delete(url_root + url_suffix, headers=header, data=json.dumps(data))


@exception_handler
def req_post_file(client, header, url_suffix, data):
    return client.post(
        url_root + url_suffix,
        headers=header,
        data=data,
        content_type="multipart/form-data",
    )


def modify_db(cfg, cmd, table, filter_field_to_val, col_to_subcol, current_val):
    engine = create_engine(cfg)

    with Session(engine) as session:
        session.execute(cmd)
        session.commit()

        # check if the command was successful
        col, subcol = col_to_subcol
        query = (
            session.query(table)
            .filter_by(**filter_field_to_val)
            .with_entities(Column(col))
            .one_or_none()
        )
        if subcol:
            assert query[0][subcol] != current_val
        else:
            assert query[0] != current_val


def del_from_db(cfg, cmd):
    engine = create_engine(cfg)
    with Session(engine) as session:
        session.execute(cmd)
        session.commit()


def get_token(user, cfg):
    payload = (
        f"client_id={cfg.AUTH_CLIENT}&grant_type=password&"
        f"username={user}&password={cfg.AUTH_PW}"
    )
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    response = requests.post(  # nosec (don't need to verify on localhost)
        cfg.TOKEN_URL, data=payload, headers=headers, verify=False
    )
    return response.json()["access_token"]


def get_header(user, cfg):
    token = get_token(user, cfg)

    return {
        "Content-Type": "application/json",
        "Authorization": token,
    }


def convert_clinical_data(client, header, data=None):
    if not data:
        data = {
            "runExampleData": True,
            "uploadedFiles": {},
            "inputFormat": "redcap",
            "outputFormats": {"bff": True, "pxf": False, "omop": False},
        }

    res = req_post(client, header, "submission/convert", data=data)

    if res.status_code != 200:
        return res.json

    assert res.status_code == 200
    response = res.json
    assert "tempFilenames" and "jobId" in response
    return response["jobId"]


def filter_by_criteria(
    client, header, url_suffix, filter_criteria, expected_or_disallowed_val
):
    default_data = {
        "phenoFormat": "bff",
        "jobId": "1234",
        "filter": {},
    }

    default_filter = {
        "inclusion": {},
        "exclusion": {},
    }

    job_id = convert_clinical_data(client, header)
    data = default_data
    data["jobId"] = str(job_id)

    # pre filter
    res = req_post(client, header, url_suffix, data=data)
    assert res.status_code == 200
    rows_pre_filter = res.json["json"]
    assert rows_pre_filter

    # filter
    new_filter = default_filter
    criteria, field, val = filter_criteria
    new_filter[criteria][field] = val
    data["filter"] = new_filter
    res = req_post(client, header, url_suffix, data=data)
    assert res.status_code == 200
    rows_after_filter = res.json["json"]

    # check if the filter worked
    assert rows_after_filter
    assert len(rows_after_filter) < len(rows_pre_filter)

    if criteria == "inclusion":
        assert all(
            expected_or_disallowed_val in row[field]["values"]
            for row in rows_after_filter
        )
    else:
        assert not any(field in row for row in rows_after_filter) or not any(
            expected_or_disallowed_val in row[field] for row in rows_after_filter
        )


class MyTester:
    """
    example how to pass a parameter to a fixture function
    see:
    https://stackoverflow.com/questions/18011902/pass-a-parameter-to-a-fixture-function
    uses True as dummy param
    """

    # TODO
    # use pytest.mark.parametrize to pass parameters
    def __init__(self, dummy_param):
        self.param = dummy_param

    def dothis(self, client, header):
        assert self.param


def read_test_file(fn):
    script_dir = Path(__file__)
    test_files_path = f"{script_dir.parents[1]}/data/{fn}"

    def is_gzipped(path):
        with open(path, "rb") as f:
            return f.read(2) == b"\x1f\x8b"

    try:
        open_fn = gzip.open if is_gzipped(test_files_path) else open
        with open_fn(test_files_path, "rb") as fh:
            return BytesIO(fh.read())
    except FileNotFoundError:
        print(f"file {test_files_path} does not exist")
