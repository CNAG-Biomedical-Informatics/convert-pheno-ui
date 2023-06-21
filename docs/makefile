#!make
#
#   make file for building the documentation
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Jun/21/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

SHELL := /bin/bash


.PHONY: .venv
venv:
	python3 -m venv .venv && source .venv/bin/activate && pip3 install -r requirements.txt

serve:
	mkdocs serve -f ../mkdocs.yml

stop:
	fuser -k 8000/tcp

build:
	mkdocs build -f ../mkdocs.yml
