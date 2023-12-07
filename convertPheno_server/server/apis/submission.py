#!/usr/bin/env python3
#
#   API for clinical coversion submission related operations
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

"""
For submitting a to be converted file
"""
import os
from pathlib import Path

from copy import deepcopy
from io import BytesIO
import gzip
import json
from uuid import uuid4
import zipfile
from time import time, localtime

from flask import request, send_file
from flask_restx import Resource, Namespace, fields
from flask_cors import cross_origin
from werkzeug.datastructures import FileStorage

# from server.app import app, api, db, limiter
from server.app import app, api, db
from server.model import Job, Output, Upload, User
from server.security import login

from server.utils.db_helpers import (
    get_or_create_user,
    update_job_status,
    write_output_to_db,
)
from server.utils.convert_pheno import generate_file_names, run_convert_pheno
from server.utils.jsonschema_helpers import generate_schema_tree

cfg = app.config
login_required = cfg["SECURITY"]

ns = Namespace(
    "submission",
    description="submission related operations",
    decorators=[cross_origin()],
)

parser = api.parser()
parser.add_argument("Authorization", type=str, location="headers", required=True)

file_meta_data_parser = api.parser()
file_meta_data_parser.add_argument(
    "X-Custom-InputFormat", type=str, location="headers", required=True
)

upload_parser = api.parser()
upload_parser.add_argument("files", location="files", type=FileStorage, required=True)

# TODO
# add to before first request create the folders
# uploads
# output


def might_be_sql(gzip_file):
    with gzip.open(gzip_file, "rt", encoding="utf-8") as f:
        content = "".join([f.readline() for _ in range(50)])

        # reset the file pointer (otherwise the conversion will fail)
        f.seek(0)

    # Check against a set of common SQL keywords
    keywords = ["CREATE", "INSERT", "SELECT", "UPDATE", "DELETE", "ALTER", "DROP"]
    for keyword in keywords:
        if keyword in content:
            return True
    return False


@ns.route("/upload", methods=("POST", "DELETE"))
class UploadFile(Resource):
    """
    API to upload files
    """

    @login(login_required)
    # @limiter.limit("1/minute")
    @api.expect(parser, upload_parser, file_meta_data_parser)
    def post(self, userid):
        """
        Upload file
        """
        args = upload_parser.parse_args()
        uploaded_file = args["files"]

        meta_data = file_meta_data_parser.parse_args()
        input_format = meta_data["X-Custom-InputFormat"]

        # get logged in userid
        user_id = get_or_create_user(userid)

        # get the file extension
        ext = uploaded_file.filename.rsplit(".", 1)[1]

        extension_allowed = False

        # TODO
        # add allowed file exensions in the config
        allowed_extensions_mapping = {
            "redcap": ["csv", "tsv", "txt", "yml", "yaml", "json"],
            "bff": ["json"],
            "pxf": ["json"],
            "omop": ["sql"],
            "cdisc": ["xml", "csv", "tsv", "txt", "yml", "yaml", "json"],
        }
        print(allowed_extensions_mapping[input_format])

        allowed_extensions = ["csv", "tsv", "txt", "yml", "yaml", "json", "sql", "xml"]

        if ext == "gz" and input_format == "omop":
            extension_allowed = True
            fn = f"{str(uuid4())}.sql.{ext}"

            if not might_be_sql(uploaded_file):
                return {"message": "File not a SQL"}, 400
        else:
            if ext in allowed_extensions:
                extension_allowed = True
                fn = f"{str(uuid4())}.{ext}"

        if not extension_allowed:
            return {"message": f"File extension {ext} is not allowed"}, 400

        try:
            uploaded_file.save(cfg["FLASK_UPLOAD_DIR"] / fn)
        except FileNotFoundError as err:
            print(err)
            return {"message": "File not uploaded"}, 500

        except Exception as err:
            print(err)
            return {"message": "File not uploaded"}, 500

        # store the filename in the database
        upload = Upload(
            owner=user_id.id,
            filename=fn,
        )
        db.session.add(upload)
        db.session.commit()

        # the filename is used to trigger the next API (convertFile)
        return {"tempFilename": fn}

    @login(login_required)
    # @limiter.limit("10/minute")
    @api.expect(parser)
    def delete(self, userid):
        """
        Delete uploaded file
        """
        data = json.loads(request.data)
        fn = data.get("tempFilename")
        if fn is None:
            return {"message": "tempFilename not found"}, 404

        user_id = db.session.query(User).filter_by(name=userid).one_or_none()
        if user_id is None:
            return {"message": "User does not exist"}, 404

        # check if the file is in the database
        upload = (
            db.session.query(Upload)
            .filter_by(owner=user_id.id, filename=fn)
            .one_or_none()
        )
        if upload is None:
            return {"message": "File not found"}, 404

        try:
            (cfg["FLASK_UPLOAD_DIR"] / fn).unlink()
        except FileNotFoundError as err:
            print(err)
            return {"message": "File not found"}, 404
        except Exception as err:
            print(err)
            return {"message": "File not deleted"}, 500

        db.session.delete(upload)
        return {"message": "File is deleted"}, 200


output_formats_schema = api.schema_model(
    "OutputFormats",
    {
        "type": "object",
        "properties": {
            "bff": {"type": "boolean"},
            "pxf": {"type": "boolean"},
            "omop": {"type": "boolean"},
        },
        "required": ["bff", "pxf", "omop"],
    },
)

uploaded_files_schema = api.schema_model(
    "UploadedFiles",
    {
        "type": "object",
        "properties": {
            "red_data.csv": {"type": "array", "items": {"type": "string"}},
            "redcap_dictionary.csv": {"type": "array", "items": {"type": "string"}},
            "red_mapping.yaml": {"type": "array", "items": {"type": "string"}},
        },
        "required": ["red_data.csv", "redcap_dictionary.csv", "red_mapping.yaml"],
    },
)

resource_fields = api.model(
    "ConvertFile",
    {
        "runExampleData": fields.Boolean(required=True),
        # "uploadedFiles": fields.List(fields.String, required=True),
        "uploadedFiles": fields.Nested(uploaded_files_schema, required=True),
        "inputFormat": fields.String(required=True),
        "outputFormats": fields.Nested(output_formats_schema, required=True),
    },
    strict=True,
)

# TODO
# make sure that the json schema validation is working again


@ns.route("/convert", methods=("POST",))
class ConvertFile(Resource):
    """
    API to convert uploaded file
    """

    @login(login_required)
    # @api.expect(parser, resource_fields, validate=True)
    @api.doc(responses={200: "Success", 400: "Validation Error"})
    def post(self, userid):
        """
        Convert file
        """
        data = request.get_json()
        runExample = data["runExampleData"]

        if runExample:
            ns.logger.info("run /w example data")
            user_id = get_or_create_user(userid).id

        # Retrieve the Keycloak userid hash from the request data
        user_keycloak_hash = data.get("KeycloakUserIdHash")
        # Check if the user exists in the database based on the Keycloak hash
        user = db.session.query(User).filter_by(keycloak_hash=user_keycloak_hash).one_or_none()
        if user is None:
            # Create new directories in the "output" and "uploads" directories with the Keycloak userid hash
            upload_dir = GeneralConfig.FLASK_UPLOAD_DIR / user_keycloak_hash
            output_dir = GeneralConfig.FLASK_OUT_DIR / user_keycloak_hash
            os.makedirs(upload_dir, exist_ok=True)
            os.makedirs(output_dir, exist_ok=True)

        # Proceed with getting or creating the user as before

        else:
            ns.logger.info("run /w uploaded data")
            user = (
                db.session.query(User)
                .filter_by(name=userid)
                .with_entities(User.id)
                .one_or_none()
            )
            if user is None:
                return {"message": "User does not exist"}, 404

            user_id = user[0]

            # TODO
            # make sure that only 3 file have been uploaded

        # TODO
        # missing the real filename
        input_format = data["inputFormat"]
        target_format_to_bool = data["outputFormats"]

        file_type_to_file = {}
        if runExample:
            path = cfg["EXAMPLE_DIR"]
            if input_format == "redcap":
                file_type_to_file["redcap"] = {}
                files = cfg["EXAMPLE_FILES_REDCAP"]
                for key in files:
                    file_type_to_file[key] = f"{path}/{files[key]}"

            elif input_format == "cdisc":
                files = cfg["EXAMPLE_FILES_CDISC"]
                for key in files:
                    file_type_to_file[key] = f"{path}/{files[key]}"

            else:
                file_type_to_file[
                    "input-file"
                ] = f"{path}/{cfg['EXAMPLE_FILES'][input_format]}"
        else:
            uploaded_mapping = data["uploadedFiles"]
            for file_name in uploaded_mapping:
                file_type, fn_after_upload = uploaded_mapping[file_name]
                posix = cfg["FLASK_UPLOAD_DIR"] / fn_after_upload
                absolute = f"{cfg['IN_OUT_DIR']}/{posix.parent.name}/{posix.name}"
                file_type_to_file[file_type] = absolute

        cli_args_mapping_all = deepcopy(cfg["CLI_ARGS_MAPPING"])
        cli_args_mapping = cli_args_mapping_all["general"]
        cli_args_selected_input = cli_args_mapping_all.get(input_format)
        if cli_args_selected_input:
            cli_args_mapping.update(cli_args_selected_input)

        input_file = file_type_to_file["input-file"]
        cli_args_mapping["input"] = [
            f"-i{input_format}",
            input_file,
        ]

        outputs = []
        job_id = int(time())
        target_formats = [key for key, val in target_format_to_bool.items() if val]
        status = {target_format: "pending" for target_format in target_formats}
        job = Job(
            job_id=job_id,
            owner=user_id,
            input_name=input_file,  # should not include the full path to the file
            input_format=input_format,
            target_formats=target_formats,
            status=status,
            convert_pheno_logs={},
        )
        db.session.add(job)
        db.session.commit()

        errors = {}
        status = {}
        out_dir = cfg["FLASK_OUT_DIR"]
        for target_format in target_formats:
            file_name_mapping = generate_file_names(job_id, target_format)
            update_job_status(
                job,
                target_format,
                "started",
            )
            log_file = out_dir / file_name_mapping["log_file"]
            error = run_convert_pheno(
                job_id,
                input_format,
                target_format,
                runExample,
                userid,
                cli_args_mapping,
                input_file,
                file_name_mapping,
                cfg["CP_EXECUTABLE_PATH"],
                job,
                ns.logger.info,
                log_file=log_file,
                uploaded_files=file_type_to_file,
            )
            if error:
                update_job_status(job, target_format, "failed")
                errors = {target_format: error}
                break

            with open(out_dir / file_name_mapping["output_name"]) as file:
                obj = json.load(file)

            json_schema = generate_schema_tree(obj)

            write_output_to_db(job.id, target_format, obj, json_schema)
            outputs.append(file_name_mapping["output_name"])

        if error:
            job.status = "failed"
            return {
                "message": "convert-pheno errored out",
                "errors": errors,
            }, 500

        return {
            "tempFilenames": outputs,
            "jobId": job_id,
        }


def zip_files(files):
    """
    based on the accepted answer on SO
    https://stackoverflow.com/questions/27337013/how-to-send-zip-files-in-the-python-flask-framework
    """

    mem_zip = None

    try:
        mem_zip = BytesIO()
        with zipfile.ZipFile(mem_zip, "w") as zf:
            for file_obj, file_name in files:
                data = zipfile.ZipInfo(
                    filename=file_name, date_time=localtime(time())[:6]
                )
                data.compress_type = zipfile.ZIP_DEFLATED
                zf.writestr(data, file_obj)
        # seek back to the beginning of the file
        mem_zip.seek(0)
    except Exception as e:
        # raise
        print("EXCEPTION")
        print(e)

    return mem_zip


def downloadAllFiles(data, job_id):
    file_data = []
    # job_id = data["jobId"]

    for fn in data["tempFilenames"]:
        _, clinical_format, _ = fn.split(".")

        output = (
            db.session.query(Output)
            .filter_by(target_format=clinical_format, job_id=job_id)
            .with_entities(Output.data)
            .one_or_none()
        )
        # TODO
        # raise error if output is None
        if output is None:
            return {"message": "clinical data not found"}, 404

        bytes_obj = str.encode(json.dumps(output[0]))
        file_data.append((bytes_obj, fn))

    # TODO
    # pass the filename to zip_files
    mem_zip = zip_files(file_data)
    return mem_zip


@ns.route("/download", methods=("POST",))
class DownloadFile(Resource):
    """
    API to download the converted file
    """

    @login(login_required)
    @api.expect(parser)
    def post(self, userid):
        """
        Flask send_file
        """
        user = db.session.query(User).filter_by(name=userid).one_or_none()
        if user is None:
            return {"message": "User does not exist"}, 404

        data = request.get_json()
        job_id = data["jobId"]
        job = (
            db.session.query(Job).filter_by(job_id=job_id, owner=user.id).one_or_none()
        )
        if job is None:
            return {"message": "Job does not exist"}, 404

        if data.get("downloadAllFiles"):
            mem_zip = downloadAllFiles(data, job.id)
            return send_file(mem_zip, mimetype="application/zip")

        temp_filename = data["tempFilename"]
        clinical_format = temp_filename.split(".")[1]
        output = (
            db.session.query(Output)
            .filter_by(target_format=clinical_format, job_id=job.id)
            .with_entities(Output.data)
            .one_or_none()
        )
        if output is None:
            return {"message": "clinical data not found"}, 404

        return send_file(
            BytesIO(json.dumps(output[0]).encode()),
            mimetype="application/json",
        )


@ns.route("/download/example", methods=("POST",))
class DownloadExampleFile(Resource):
    """
    API to download example input
    """

    @login(login_required)
    @api.expect(parser)
    def post(self, userid):
        """
        Flask send_file
        """
        data = request.get_json()
        input_format = data["inputFormat"]
        example_file = cfg["EXAMPLE_FILES"][input_format]
        file_path = cfg["FLASK_EXAMPLE_DIR"] / example_file
        return send_file(file_path, as_attachment=True)


ns.add_resource(
    DownloadExampleFile, "/download/example", endpoint="download_example_file"
)
ns.add_resource(UploadFile, "/upload", endpoint="upload_file")
ns.add_resource(ConvertFile, "/convert", endpoint="convert_file")
ns.add_resource(DownloadFile, "/download", endpoint="download_file")
