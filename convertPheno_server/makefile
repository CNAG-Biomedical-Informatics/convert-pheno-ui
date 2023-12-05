#!make
#
#   make file for running a development server and running tests
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

SHELL := /bin/bash
include .env

install:
	pip install --upgrade .

.PHONY: .venv
venv:
	python3 -m venv .venv && source venv/bin/activate && pip3 install -r requirements-mini.txt

db-run:
	docker run --name cp-pg -e POSTGRES_PASSWORD=postgres -d postgres

db-ip:
	docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' cp-pg

db-empty:
	python3 emptyAllTables.py postgres:postgres postgres $(shell docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' cp-pg)

kc-key:
	./get_public_kc_key.sh https://${DOMAIN}/auth/ ${KC_REALM} >> .env

cp:
	docker compose up --build convert-pheno

compose:
	docker compose up

activate:
	poetry shell

export_reqs:
	poetry export --without-hashes -f requirements.txt --output requirements.txt

run:
	export FLASK_APP=server.app.py && export FLASK_DEBUG=1 && \
	export FLASK_RUN_PORT=5001 \
	&& poetry run flask run --host 0.0.0.0

stop:
	fuser -k 5001/tcp && \
	ps -ef | grep "poetry shell" | awk '{print $$2}'| xargs kill -9


auth-test:
	KC_PUBLIC_KEY=$(KC_PUBLIC_KEY) python3 -m pytest --junitxml=tests/reports/junit.xml tests/test_auth.py

unit-test:
	python3 -m pytest --junitxml=tests/reports/junit.xml tests/test_auth.py::TestAuthClass::test_decorator_login_required

.PHONY: test

test:
	KC_PUBLIC_KEY=$(KC_PUBLIC_KEY) poetry run pytest --junitxml=tests/reports/junit.xml

debug-test:
	KC_PUBLIC_KEY=$(KC_PUBLIC_KEY) python3 -m pytest --pdb --junitxml=tests/reports/junit.xml tests/

debug-test2:
	KC_PUBLIC_KEY=$(KC_PUBLIC_KEY) python3 -m pytest --pdb tests/test_submission.py::TestSubmissionClass::test_upload[dev_client]

debug-test3:
	KC_PUBLIC_KEY=$(KC_PUBLIC_KEY) python3 -m pytest --pdb tests/test_clinical.py::TestClinicalFilteringClass

remove_reports:
	rm -rf tests/reports/coverage

cov:
	KC_PUBLIC_KEY=$(KC_PUBLIC_KEY) python3 -m pytest --junitxml=tests/reports/junit.xml --cov-config=tests/.coveragerc --cov-branch --cov-report html:tests/reports/coverage --cov-report xml:tests/reports/coverage/coverage.xml  --cov-report term --cov=server tests/

flake:
	echo > tests/reports/flake8/flake8stats.txt
	flake8 server --statistics --tee --output-file tests/reports/flake8/flake8stats.txt --format=html --htmldir=tests/reports/flake8 --exit-zero

lint:
	echo > tests/reports/flake8/flake8stats.txt
	flake8 server --statistics --tee --output-file tests/reports/flake8/flake8stats.txt --format=html --htmldir=tests/reports/flake8 --exit-zero
	pylint server --exit-zero

badge:
	genbadge tests -v -i tests/reports/junit.xml -o tests/reports/tests-badge.svg
	genbadge coverage -v -i tests/reports/coverage/coverage.xml -o tests/reports/coverage-badge.svg
	genbadge flake8 -v -i tests/reports/flake8/flake8stats.txt -o tests/reports/flake8-badge.svg

push:	cov flake, lint badge
	git add -A
	git commit -am "updated tests,cov,flake,lint badge"
	git push

sonar:
	/usr/local/bin/sonar-scanner -Dsonar.login=${SONAR_TOKEN}
