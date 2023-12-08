#!/usr/bin/env python3
#
#   database models
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license

"""
Table schemas for the postgres db
"""
from datetime import datetime

from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, ARRAY

from server.app import db


class User(db.Model):
    """
    Schema and functions for the table users
    """

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(120), nullable=False)  # keycloak "preferred_username"
    uuid = Column(String(120), nullable=False)  # keycloak "sub"


class Upload(db.Model):
    """
    Schema and functions for the table uploads
    """

    __tablename__ = "uploads"

    id = Column(Integer, primary_key=True, autoincrement=True)
    owner = Column(ForeignKey("users.id"), nullable=False)
    filename = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class Job(db.Model):
    """
    Schema and functions for the table jobs
    """

    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    job_id = Column(Integer, nullable=False)
    owner = Column(ForeignKey("users.id"), nullable=False)
    input_format = Column(String, nullable=False)
    input_name = Column(String, nullable=False)
    target_formats = Column(ARRAY(String), nullable=False)
    status = Column(JSONB, nullable=False)
    errors = Column(JSONB, nullable=True)
    convert_pheno_logs = Column(JSONB, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class Output(db.Model):
    """
    Contains the output of the pheno conversion
    """

    __tablename__ = "output"

    id = Column(Integer, primary_key=True, autoincrement=True)
    job_id = Column(ForeignKey("jobs.id"), nullable=False)
    target_format = Column(String, nullable=False)
    data = Column(JSONB, nullable=False)

    # TODO
    # better call it json_schema_tree
    json_schema = Column(JSONB, nullable=False)


class History(db.Model):

    """
    Schema and functions for the table history
    """

    __tablename__ = "history"

    id = Column(Integer, primary_key=True)
    entity_id = Column(String(300), nullable=False)
    timestamp = Column(DateTime, nullable=False, default=datetime.utcnow)
    username = Column(String(120), nullable=False)
    endpoint = Column(String(1000), nullable=False)
    method = Column(String(120), nullable=False)
    content = Column(JSONB)

    def save_to_db(self):
        """
        insert into db
        """
        db.session.add(self)
        db.session.commit()
