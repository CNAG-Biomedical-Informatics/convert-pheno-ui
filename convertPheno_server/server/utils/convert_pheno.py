#!/usr/bin/env python3
#
#   helper functions to run convert-pheno
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license
"""
For converting a file into a different format using convert-pheno
"""
import docker
from server.utils.db_helpers import update_job_status


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
    job_id,
    input_format,
    target_format,
    runExample,
    userid,
    cli_args_mapping,
    input_file,
    file_name_mapping,
    executable_path,
    job_db_obj,
    logger,
    log_file,
    uploaded_files=None,
):
    logger(f"job_id:{job_id} - Create Convert-Pheno command")
    cli_args_mapping.update(
        {
            "target": [
                f"-o{target_format}",
                file_name_mapping["output_name"],
            ],
            "log": [
                "-log",
                file_name_mapping["log_file"],
            ],
            "user": [
                "--user",
                userid,
            ],
        }
    )

    if not runExample and input_format in ["redcap", "cdisc"]:
        cli_args_mapping.update(
            {
                "redcap_dict": [
                    "-rcd",
                    uploaded_files["redcap-dictionary"],
                ],
                "mapping_file": [
                    "--mapping-file",
                    uploaded_files["mapping-file"],
                ],
            }
        )

    cli_args = []
    for item in cli_args_mapping.values():
        cli_args.extend(item)

    logger(f"Converting file:{input_file} to format {target_format}")
    cmd = [executable_path] + cli_args

    update_job_status(job_db_obj, target_format, "running")

    container = get_docker_container()
    result, error_msg = container.exec_run(cmd, demux=True)
    print("result", result)

    status = "success" if result == 0 else "failed"

    # TODO
    # test errors
    update_job_status(
        job_db_obj, target_format, status, log_file=log_file, error_msg=error_msg
    )
    return None
