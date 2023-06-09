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

CURRENT_DATE = $(shell date)
export IGNORE_CACHE_FROM_HERE:=$(CURRENT_DATE)
export KC_CMD =start-dev --import-realm
# For containers, the import directory is /opt/keycloak/data/import

include .env

run:
	docker compose up -d

prod:
	docker compose -f docker-compose.prod.yml up -d

stop:
	docker compose down

rebuild:
	docker compose build --no-cache

rebuild-api:
	docker compose build --no-cache api

d-api:
	docker compose up --build api

d-client:
	docker compose up --build client

re-kc:
	docker compose restart keycloak

re-api:
	docker compose restart api

re-client:
	docker compose restart client

l-api:
	docker compose logs -f api

l-kc:
	docker compose logs -f keycloak

kc:
	docker compose up keycloak

kc-key:
	./get_public_kc_key.sh "https://${DOMAIN}/auth" ${KC_REALM} >> .env

kc-ip:
	docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' local_keycloak

db-ip:
	docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' convert-pheno-api-db

mkcert:
	/usr/local/bin/mkcert -cert-file ./nginx_mountpoint/certs/convertpheno.local.dev.pem -key-file ./nginx_mountpoint/certs/convertpheno.local.dev-key.pem convertpheno.local.dev
