#!/usr/bin/env python3
#
#   helper functions to handle all kind of errors
#
#   This file is part of convert-pheno-ui
#
#   Last modified: Dec/08/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license

from traceback import TracebackException as tbException


def handle_expected_err(err, expected_err):
    if str(err) != expected_err:
        raise err

    return None


# custom exceptions:
class ApiException(Exception):
    """
    Exception raised when encountering a bad request.
    """

    def __init__(self, message=None, status_code=500, payload=None):
        if message is not None:
            self.message = message
        else:
            self.message = "Sorry, that error is on our side, please contact:"

        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        """
        Call this in the the error handler to serialize the
        error for the json-encoded http response body.
        """
        payload = dict(self.payload or {})
        payload["message"] = self.message
        payload["status_code"] = self.status_code
        return payload

    def to_database(self):
        # TODO
        # write the error message into the history table
        pass


class DataNotFound(ApiException):
    """
    Attributes:
        message -- explanation of the error
        code -- html status code
    """

    def __init__(self, missing_data):
        self.missing_data = missing_data
        self.message = f"{missing_data} not in request data"
        self.status_code = 404

        # pass to the base Exception class
        super().__init__(self.message, self.status_code)

    def __str__(self):
        return self.message


class DataAlreadyPresent(ApiException):
    """
    Attributes:
        message -- explanation of the error
        code -- html status code
    """

    def __init__(self, duplicated_data):
        self.missing_data = duplicated_data
        self.message = f"{duplicated_data} already exists"
        self.status_code = 405

        # pass to the base Exception class
        super().__init__(self.message, self.status_code)

    def __str__(self):
        return self.message


class KeyNotFound(ApiException):
    """
    Attributes:
        key -- which caused the error
        message -- explanation of the error
        code -- html status code
    """

    def __init__(self, key):
        self.used_key = key
        self.message = f"{key} not in request data"
        self.status_code = 404

        # pass message as an argument to the base Exception class
        super().__init__(self.message, self.status_code)

    def __str__(self):
        return self.message


class WrongKey(ApiException):
    """
    Attributes:
        key -- which caused the error
        message -- explanation of the error
        code -- html status code
    """

    def __init__(self, key):
        self.used_key = key
        self.message = f"{key} not allowed in request data"
        self.status_code = 404

        super().__init__(self.message, self.status_code)

    def __str__(self):
        return self.message


class WrongSchema(ApiException):
    """
    Attributes:
        key -- which caused the error
        message -- explanation of the error
        code -- html status code
    """

    def __init__(self, message, code=405):
        self.message = message
        self.status_code = code

        if ".txt$" in self.message:
            self.message = "The Data Usage Policy File must be in .txt format"

        if "d+$" in self.message:
            self.message = "Samples or Features Count must be numeric"

        super().__init__(self.message, self.status_code)

    def __str__(self):
        return self.message


class BadValue(ApiException):
    """
    Attributes:
        value -- which caused the error
        message -- explanation of the error
        code -- html status code
    """

    def __init__(self, col, val):
        self.used_value = val
        self.message = f"{val} not accepted for column {col}"
        self.status_code = 405

        super().__init__(self.message, self.status_code)

    def __str__(self):
        return self.message


class BadArgument(ApiException):
    """
    Attributes:
        argument -- which caused the error
        message -- explanation of the error
        code -- html status code
    """

    def __init__(self, arg):
        self.used_argument = arg
        self.message = f"{arg} not a valid argument please look into the documentation"
        self.status_code = 405

        super().__init__(self.message, self.status_code)

    def __str__(self):
        return self.message


class InvalidGroup(ApiException):
    """
    Attributes:
        group -- which caused the error
        message -- explanation of the error
        code -- html status code
    """

    def __init__(self, group):
        self.used_argument = group
        self.message = f"{group} is not a valid keycloak group"
        self.status_code = 405

        super().__init__(self.message, self.status_code)

    def __str__(self):
        return self.message


class EmptyQuery(ApiException):
    """
    Attributes:
        query -- which caused the error
        message -- explanation of the error
        code -- html status code (default = 404)
        payload -- already prefilled payload (default = None)
    """

    def __init__(self, query, message, status_code=404, payload=None):
        self.used_query = query
        self.message = message
        self.status_code = status_code
        self.payload = payload

        super().__init__(self.message, self.status_code, self.payload)

    def __str__(self):
        return self.message


class DatabaseError(ApiException):
    """
    Attributes:
        query -- which caused the error
        message -- explanation of the error
        code -- html status code (default = 404)
        payload -- already prefilled payload (default = None)
    """

    def __init__(self, method, error, message, status_code=500, payload=None):
        self.used_method = method
        self.message = message
        self.status_code = status_code
        self.payload = payload
        self.error = error
        self.exception_type = error.__class__.__name__
        self.pgerror = error.orig.pgerror

        super().__init__(self.message, self.status_code, self.payload)

    def __str__(self):
        return self.message


class BadFile(ApiException):
    """
    Attributes:
        file -- which caused the error
        message -- explanation of the error
        code -- html status code (default = 405)
        payload -- already prefilled payload (default = None)
    """

    def __init__(self, file, message, status_code=405, payload=None):
        self.uploaded_file = file
        self.message = message
        self.status_code = status_code
        self.payload = payload

        super().__init__(self.message, self.status_code, self.payload)

    def __str__(self):
        return self.message


class PayloadTooLarge(ApiException):
    """
    Attributes:
        message -- explanation of the error
        code -- html status code (default = 413)
        payload -- already prefilled payload (default = None)
    """

    def __init__(self, status_code=413, payload=None):
        self.message = "payload too large"
        self.status_code = status_code
        self.payload = payload

        super().__init__(self.message, self.status_code, self.payload)

    def __str__(self):
        return self.message


class ServiceUnavailable(ApiException):
    """
    Attributes:
        service -- which caused the error
        message -- explanation of the error
        error -- error message returned by the failing api
        code -- html status code (default = 500)
        payload -- already prefilled payload (default = None)

    returns Error message when Ceph or Keycloak are not working
    """

    # TODO
    # rewrite that to accept a json in put for self.error

    def __init__(self, service, message, error, status_code=500, payload=None):
        self.used_service = service
        self.message = message
        self.error = error
        self.exception_type = error.__class__.__name__
        self.status_code = status_code
        self.payload = payload

        super().__init__(self.message, self.status_code, self.payload)

    def __str__(self):
        return self.message


class ServiceErroredOut(ApiException):
    """
    Attributes:
        service -- which caused the error
        message -- explanation of the error
        error -- error message returned by the failing api
        code -- html status code (default = 405)
        payload -- already prefilled payload (default = None)

    returns Error message when Jenkins or Ceph are not working
    """

    def __init__(self, service, message, error, status_code=500, payload=None):
        self.used_service = service
        self.message = message
        self.error = error
        self.tb = tbException.from_exception(error)._str
        self.exception_type = error.__class__.__name__
        self.status_code = status_code
        self.payload = payload

        super().__init__(self.message, self.status_code, self.payload)

    def __str__(self):
        return self.message


class ImplementationError(ApiException):
    """
    Attributes:
        file -- which caused the error
        line_no -- where the error occured
        message -- explanation of the error
        error -- error message returned by the failing api
        code -- html status code (default = 500)
        payload -- already prefilled payload (default = None)

    returns Error message when Jenkins or Ceph are not working
    """

    def __init__(self, error, file, status_code=500, payload=None):
        self.error = (error,)
        self.file = (file,)
        self.line_no = error.__traceback__.tb_lineno
        self.tb = tbException.from_exception(error)._str
        self.exception_type = error.__class__.__name__
        self.status_code = status_code
        self.payload = payload

        super().__init__(self.message, self.status_code, self.payload)

    def __str__(self):
        return self.message
