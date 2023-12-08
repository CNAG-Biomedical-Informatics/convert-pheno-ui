#!/usr/bin/env python3
#
#   general config
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license

from pathlib import Path


class GeneralConfig:

    """
    config for convertPheno_server
    """

    # postgres
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # TODO
    # there should be a way to check if the expected folders exist
    # and if not throw an error

    # flask
    FLASK_UPLOAD_DIR = Path("data/uploads/")
    FLASK_EXAMPLE_DIR = Path("data/example_in/").resolve()
    FLASK_OUT_DIR = Path("data/output/").resolve()
    ALLOWED_EXTENSIONS = ["tsv", "csv", "txt", "json"]

    # convert-pheno
    CONVERT_PHENO_PATH = "/usr/share/convert-pheno"
    DATA_DICTIONARY = "redcap_dictionary.csv"
    REDCAP_IN_FOLDER = f"{CONVERT_PHENO_PATH}/t/redcap2bff/in"
    RCD = f"{REDCAP_IN_FOLDER}/{DATA_DICTIONARY}"
    MAPPING_FILE = f"{REDCAP_IN_FOLDER}/redcap_mapping.yaml"
    CP_EXECUTABLE_PATH = f"{CONVERT_PHENO_PATH}/bin/convert-pheno"

    IN_OUT_DIR = "/home"
    UPLOAD_DIR = f"{IN_OUT_DIR}/uploads/"
    EXAMPLE_DIR = f"{IN_OUT_DIR}/example_in/"
    OUT_DIR = f"{IN_OUT_DIR}/output/"

    LOG_FILE_NAME = "convert-pheno-log.json"

    CLI_ARGS_MAPPING = {
        "general": {
            "input": ["-i", UPLOAD_DIR],
            "target": [None, None],
            "output_dir": ["-out-dir", OUT_DIR],
            "log": ["-log", LOG_FILE_NAME],
            "user": ["--user", "test"],
        },
        "redcap": {
            "redcap_dict": ["-rcd", RCD],
            "mapping_file": ["--mapping-file", MAPPING_FILE],
        },
        "omop": {
            "separator": ["-sep", ","],
        },
        "cdisc": {
            "redcap_dict": ["-rcd", RCD],
            "mapping_file": ["--mapping-file", MAPPING_FILE],
        },
    }

    DEFAULT_FILE_EXT = {
        "redcap": "csv",
        "bff": "json",
        "pxf": "json",
        "omop": "sql",
        "cdisc": "xml",
    }

    EXAMPLE_FILES = {
        "redcap": "redcap.zip",
        "bff": "individuals.bff.json",
        "pxf": "all.pxf.json",
        "omop": "omop_cdm_eunomia.sql.gz",
        "cdisc": "cdisc.zip",
    }

    EXAMPLE_FILES_REDCAP = {
        "input-file": "redcap_data.csv",
        "redcap-dictionary": "redcap_dictionary.csv",
        "mapping-file": "redcap_mapping.yaml",
    }

    EXAMPLE_FILES_CDISC = {
        "input-file": "cdisc_odm_data.xml",
        "redcap-dictionary": "cdisc_odm_dictionary.csv",
        "mapping-file": "cdisc_odm_mapping.yaml",
    }

    CLINICAL_DATA_COLS = {
        "bff": {
            "row_data_default": {
                "exposures": [],
                "diseases": [],
                "interventionsOrProcedures": [],
                "treatments": [],
            },
            "key_to_subkey": {},
            "fields_to_substring": [
                (
                    [
                        "diseases",
                        "measures",
                        "exposures",
                        "treatments",
                        "interventionsOrProcedures",
                    ],
                    "Code",
                ),
                (
                    [
                        "phenotypicFeatures",
                    ],
                    "Type",
                ),
            ],
            "cols_val_json_arr": ["exposures", "treatments"],
            "default_order": [
                "id",
                "study_id",
                "redcap_event_name",
                "diseases",
                "sex",
                "ethnicity",
                "interventionsOrProcedures",
                "exposures",
                "measures",
                "treatments",
                "phenotypicFeatures",
            ],
            "default_cols": {
                "id": [],
                "info": ["study_id", "redcap_event_name"],
                "diseases": [],
                "sex": [],
                "ethnicity": [],
                "interventionsOrProcedures": [],
                "exposures": [],
                "measures": [],
                "treatments": [],
                "phenotypicFeatures": [],
            },
        },
        "pxf": {
            "row_data_default": {
                "medicalActions": [],
                "diseases": [],
            },
            "key_to_subkey": {
                "diseases": ["term"],
                "measurements": ["assay"],
                "medicalActions": ["procedure"],
                "phenotypicFeatures": ["type"],
            },
            "fields_to_substring": [],
            "cols_val_json_arr": ["medicalActions"],
            "default_order": [
                "id",
                "sex",
                "vitalStatus",
                "diseases",
                "measurements",
                "medicalActions",
                "phenotypicFeatures",
            ],
            "default_cols": {
                "diseases": [],
                "measurements": [],
                "medicalActions": [],
                "phenotypicFeatures": [],
                "subject": ["id", "sex", "vitalStatus"],
            },
        },
    }
