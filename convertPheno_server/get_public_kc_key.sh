#!/bin/bash
#
#   bash script to get the public key from the keycloak server
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

KC_URL=$1
KC_REALM=$2
CERTS_URL="$KC_URL/realms/$KC_REALM/protocol/openid-connect/certs"
KEY=$(curl -sSk $CERTS_URL | jq -r ".keys[] | .x5c[0]")
echo KC_PUBLIC_KEY=$KEY
