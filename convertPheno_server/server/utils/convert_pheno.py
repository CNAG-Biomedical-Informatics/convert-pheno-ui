#!/usr/bin/env python3
#
#   helper functions to run convert-pheno
#
#   This file is part of convert-pheno-ui
#
#   Last modified: Dec/08/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license
"""
For converting a file into a different format using convert-pheno
"""
import docker
from server.utils.db_helpers import update_job_status

from server.app import app

cfg = app.config


def get_docker_container():
    """
    return a docker container object
    """
    # TODO: add error handling
    client = docker.from_env()
    try:
        container_obj = client.containers.get("convert-pheno")
    except docker.errors.NotFound:
        raise ValueError("Docker container convert-pheno not found")

    return container_obj


def generate_file_names(job_id, target_format):
    """
    Generate the file names
    """
    file_name = f"{job_id}.{target_format}"
    files = {
        "output_name": f"{file_name}.json",
        "log_file": f"{file_name}-log.json",
    }
    return files


def run_convert_pheno(
    logger,
    kwargs,
    log_file,
    uploaded_files=None,
):
    user_id = kwargs["userid"]
    uuid = kwargs["uuid"]

    job_id = kwargs["job_id"]
    job_db_obj = kwargs["job_db_obj"]

    input_file = kwargs["input_file"]
    input_format = kwargs["input_format"]
    target_format = kwargs["target_format"]
    run_example_bool = kwargs["runExample"]

    cli_args_mapping = kwargs["cli_args_mapping"]
    file_name_mapping = kwargs["file_name_mapping"]

    logger(f"job_id:{job_id} - run_convert_pheno")
    cli_args_mapping.update(
        {
            "target": [
                f"-o{target_format}",
                f"{uuid}/{file_name_mapping['output_name']}",
            ],
            "log": [
                "-log",
                f"{uuid}/{file_name_mapping['log_file']}",
            ],
            "user": [
                "--user",
                user_id,
            ],
        }
    )

    if not run_example_bool and input_format in ["redcap", "cdisc"]:
        cli_args_mapping.update(
            {
                "redcap_dict": ["-rcd", uploaded_files["redcap-dictionary"]],
                "mapping_file": ["--mapping-file", uploaded_files["mapping-file"]],
            }
        )

    cli_args = []
    for item in cli_args_mapping.values():
        cli_args.extend(item)

    logger(f"Converting file:{input_file} to format {target_format}")
    cmd = [cfg["CP_EXECUTABLE_PATH"]] + cli_args

    update_job_status(job_db_obj, target_format, "running")

    container = get_docker_container()
    result, (stdout, stderr) = container.exec_run(cmd, demux=True)
    print("result", result)

    status = "success" if result == 0 else "failed"

    if (stdout, stderr) != (None, None):
        logger(f"job_id:{job_id} - {cmd} run into:")

        if stdout:
            stdout = stdout.decode("utf-8").split("\n")
            logger(f"job_id:{job_id} - Convert-Pheno failed: {stdout}")

        if stderr:
            stderr = stderr.decode("utf-8").split("\n")
            logger(f"job_id:{job_id} - Convert-Pheno returned: {stderr}")

    update_job_status(
        job_db_obj, target_format, status, log_file=log_file, error_msg=(stdout, stderr)
    )
    return None
