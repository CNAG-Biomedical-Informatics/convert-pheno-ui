#!/usr/bin/env python3
#
#   API for clinical job conversion related operations
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

from flask import request
from flask_restx import Resource, Namespace
from flask_cors import cross_origin

from server.security import login_required
from server.app import api, db

from server.model import User, Job

ns = Namespace(
    "jobs",
    description="conversion jobs related operations",
    decorators=[cross_origin()],
)

parser = api.parser()
parser.add_argument("Authorization", type=str, location="headers", required=True)


class JobView(Resource):
    """
    Returns the job data of a specific job id
    """

    @login_required
    def post(self, userid):
        user = db.session.query(User).filter_by(name=userid).one_or_none()
        if user is None:
            return {"message": "User does not exist"}, 404

        data = request.get_json()
        job_id = data["jobId"]

        # TODO
        # error handling when job_id == undefined

        job = (
            db.session.query(Job).filter_by(job_id=job_id, owner=user.id).one_or_none()
        )
        if job is None:
            return {"message": "Job does not exist"}, 404

        output_formats = job.target_formats
        tempfiles_names = [f"{job_id}.{format}.json" for format in output_formats]

        job_data = {
            "inputFormat": job.input_format,
            "outputFormats": output_formats,
            "tempFilenames": tempfiles_names,
            "jobId": job_id,
        }

        return {
            "message": "Job data retrieved successfully",
            "data": job_data,
        }


ns.add_resource(JobView, "/job", endpoint="jobs_data_view")
