#!/usr/bin/env python3
#
#   helper functions to communicate with the database
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license
import json
from server.app import db, app
from sqlalchemy.orm.attributes import flag_modified

from server.model import Output, User

cfg = app.config


def get_or_create_user(userid, uuid):
    """
    Get or create a user
    """
    user = db.session.query(User).filter_by(name=userid).one_or_none()
    if user is None:
        user = User(name=userid, uuid=uuid)
        db.session.add(user)
        db.session.commit()

        for directory in ["UPLOAD", "OUT"]:
            directory = cfg[f"FLASK_{directory}_DIR"] / uuid

            try:
                directory.mkdir()
            except FileExistsError:
                # TODO
                # in testing mode return pass otherwise raise error
                pass

    return user


def get_log_info(log_file):
    """
    Get the log info
    """
    if not log_file.is_file():
        return {"error": "log file not found"}
    try:
        with open(log_file) as file:
            log = json.load(file)
    except Exception as err:
        log = {"error": str(err)}
    return log


def update_job_status(
    job_db_obj, target_format, new_status, log_file=None, error_msg=(None, None)
):
    """
    Update the job db object
    """
    try:
        if job_db_obj.status[target_format] == new_status:
            # whithout this check flag_modified fails
            return None
    except KeyError:
        raise KeyError(f"target_format {target_format} not found in job_db_obj.status")

    flag_modified(job_db_obj, "status")
    job_db_obj.status[target_format] = new_status

    if log_file:
        flag_modified(job_db_obj, "convert_pheno_logs")
        job_db_obj.convert_pheno_logs[target_format] = get_log_info(log_file)

    if error_msg != (None, None):
        print("error_msg", error_msg)
        flag_modified(job_db_obj, "errors")
        if job_db_obj.errors is None:
            job_db_obj.errors = {}

        job_db_obj.errors[target_format] = error_msg

    db.session.commit()


def write_output_to_db(job_id, target_format, obj, json_schema):
    """
    Write output to database
    """

    # TODO:
    # add error handling
    output = Output(
        job_id=job_id, target_format=target_format, data=obj, json_schema=json_schema
    )
    db.session.add(output)
    db.session.commit()
