#!/usr/bin/env python3
#
#   helper functions for authorization and API call logs
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

"""Authorization and API call logs"""
import os
import datetime
from functools import wraps
from flask import request
import jwt
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend

from server.app import app, db
from server.model import History

cfg = app.config
options = cfg["JWT_OPTIONS"]
login_required = cfg["SECURITY"]


def get_public_key():
    """
    Gets the public key from the KC_PUBLIC_KEY environment variable.

    Parameters:
    kc_key (str): The public key from the environment variable.

    Returns:
    The public key loaded from the certificate string.
    """

    kc_key = os.environ.get("KC_PUBLIC_KEY")
    cert = f"-----BEGIN CERTIFICATE-----\n{kc_key}\n-----END CERTIFICATE-----"
    public_key = load_pem_x509_certificate(
        cert.encode(), default_backend()
    ).public_key()
    return public_key


def login(login_required=True):
    """
    Decorator for handling keycloak login
    # TODO: refactor
    """

    def decorator(func):
        @wraps(func)
        def decorated_function(*args, **kwargs):
            if not login_required:
                return func(userid="dev", *args, **kwargs)

            token = request.headers.get("Authorization")

            if token is None:
                return {"message": "No token provided"}, 401

            public_key = get_public_key()
            try:
                decoded = jwt.decode(
                    token, public_key, algorithms="RS256", options=options
                )

            except jwt.exceptions.InvalidSignatureError as err:
                print(err, "check if the public key is correct")
                print("public key:", public_key)
                return {"message": f"{err}"}, 500

            # Check if changing the cryptograph version helps
            except jwt.exceptions.InvalidAlgorithmError as e:
                # If this exception is triggered it is likely
                # that the installed cryptography version is wrong
                # supported versions = [41.0]
                return {"message": f"{e}"}, 500

            except jwt.exceptions.DecodeError as e:
                # If this exception is triggered it is likely
                # that the token has a invalid header or cryptopadding`
                return {"message": f"{e}"}, 500

            except Exception as e:
                return {
                    "message": f"Something went wrong {e} {e.__class__.__name__}"
                }, 500

            userid = decoded.get("preferred_username")

            timestamp = datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y")
            print(
                "\t".join(
                    [
                        timestamp,
                        userid,
                        f"{request.url}-{request.method}",
                    ]
                )
            )
            return func(userid=userid, *args, **kwargs)

        return decorated_function

    return decorator


@app.after_request
def history(response):
    """
    Record any request and save it in history table (on postgres)
    """
    if (
        login_required
        and request.method != "OPTIONS"
        and "Authorization" in request.headers
    ):
        token = request.headers["Authorization"]
        public_key = get_public_key()
        try:
            decoded = jwt.decode(token, public_key, algorithms="RS256", options=options)

        except jwt.exceptions.InvalidAlgorithmError as e:
            return {"message": f"{e}"}, 500

        except Exception as e:
            return {"message": f"Something went wrong {e} {e.__class__.__name__}"}, 500

        userid = decoded.get("preferred_username")
        timestamp = datetime.datetime.now().strftime("%I:%M%p on %B %d, %Y")

        splitted = request.url.split("/")
        entity_id = splitted[len(splitted) - 1]
        content = {"data": "empty"}
        updated_content = {"data": "updated"}

        if request.method == "POST":
            content["data"] = request.json
            if response.status == "200 OK":
                try:
                    # If uploading JSON or Excel
                    if isinstance(response.json, list):
                        for ent in range(0, len(response.json)):
                            entity_id = response.json[ent]["id"]
                            insert_history_entry(
                                entity_id,
                                userid,
                                request,
                                {"data": "uploaded"},
                            )
                    else:
                        entity_id = response.json["id"]

                except Exception as e:
                    print("POST without ID in the response", e)

        if request.method == "PUT" and response.status == "200 OK":
            try:
                content = updated_content
            except Exception as e:
                print("PUT without ID in the response", e)

        # Save to db
        insert_history_entry(entity_id, userid, request, content)

        print(
            "\t".join(
                [
                    timestamp,
                    userid,
                    f"{request.url}-{request.method}",
                ]
            )
        )
    return response


def insert_history_entry(entity_id, userid, req, content):
    """
    insert request into history table (in postgres)
    """

    his = History(
        entity_id=entity_id,
        timestamp=datetime.datetime.now(),
        username=userid,
        endpoint=req.url,
        method=req.method,
        content=content,
    )

    try:
        his.save_to_db()

    except Exception as e:
        print(e)
        db.session.rollback()
