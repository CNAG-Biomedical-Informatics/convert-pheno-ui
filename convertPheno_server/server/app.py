#!/usr/bin/env python3
#
#   run the flask app
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

"""
create flask app
"""
import traceback
import logging

from flask import Flask
from flask.wrappers import Request
from flask_restx import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from server.utils.error_handler import ApiException

# configure root logger
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

app.config.from_object("server.config.general_config.GeneralConfig")
app.config.from_object("server.config.config.Config")

# https://github.com/python-restx/flask-restx/issues/160
app.url_map.strict_slashes = False


class AnyJsonRequest(Request):
    """
    temporary workaround for the error:
    werkzeug.exceptions.BadRequest: 400 Bad Request:
    Did not attempt to load JSON data because
    the request Content-Type was not 'application/json'.
    taken from: https://github.com/pallets/flask/issues/4552#issuecomment-1109785314
    """

    def on_json_loading_failed(self, e):
        if e is not None:
            return super().on_json_loading_failed(e)


app.request_class = AnyJsonRequest
api = Api(app, doc="/doc")
db = SQLAlchemy(app)


@app.before_first_request
def create_tables():
    """Create all sql tables"""
    db.create_all()


@api.errorhandler
def handle_general_exception(err):
    """Return JSON instead of HTML for any other server error"""

    # better log them somewhere?
    print(f"Unknown Exception: {str(err)}")
    print(
        "".join(traceback.format_exception(type(err), value=err, tb=err.__traceback__))
    )
    return {"message": "Sorry, that error is on our side, please contact:"}, 500


@api.errorhandler(ApiException)
def handle_raised_exception(err):
    """
    Return custom JSON when APIException is raised
    """
    return err.to_dict()


if app.debug:  # pragma: no cover
    # for database migrations
    # from flask_migrate import Migrate
    # migrate = Migrate(app, db)

    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    # logging.getLogger("flask_cors").level = logging.DEBUG

    # from flask_debugtoolbar import DebugToolbarExtension
    # toolbar = DebugToolbarExtension(app)

    @app.route("/debug")
    def hello_world():
        return 'return "<html><body>debug</body></html>"'


# have to be imported here otherwise circular import error
from server.apis.test import ns as ns_test  # noqa: E402
from server.apis.submission import ns as ns_submission  # noqa: E402
from server.apis.jobs import ns as ns_jobs  # noqa: E402
from server.apis.clinical import ns as ns_clinical  # noqa: E402

api.add_namespace(ns_test, path="/api")
api.add_namespace(ns_submission, path="/api/submission")
api.add_namespace(ns_jobs, path="/api/jobs")
api.add_namespace(ns_clinical, path="/api/clinical")

if __name__ == "__main__":  # pragma: no cover
    app.run(host="127.0.0.1", port=5000, threaded=True)
