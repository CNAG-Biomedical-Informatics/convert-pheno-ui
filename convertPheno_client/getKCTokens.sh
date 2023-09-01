#!/bin/bash
#
#   bash script to get the keycloak tokens for testing
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license

#import keycloak credentials
. kc.env

USERS=($USER1 $USER2 $USER3)
for ((i = 0; i < ${#USERS[@]}; i++)); do

	echo "Getting token for user ${USERS[$i]}"
	USERNAME=${USERS[$i]}

	KEYCLOAK_URL="https://$HOST/auth/realms/$REALM/protocol/openid-connect/token"
	RES=$(curl -X POST "$KEYCLOAK_URL" "--insecure" \
		-H "Content-Type: application/x-www-form-urlencoded" \
		-d "username=$USERNAME" \
		-d "password=$PASSWORD" \
		-d "grant_type=password" \
		-d "client_id=$CLIENT_ID")

	ERROR=$(grep 'error' <<<$RES)
	if ! [ -z "$ERROR" ]; then
		echo "$ERROR"
		exit 1
	fi

	TOKEN=$(echo $RES | jq '.access_token' | tr -d '"')
	# echo $TOKEN
	JSON_STRING=$(jq -n --arg tk "$TOKEN" \
		'{fakeLogin:{account:{},access_token:$tk}}')

	echo $JSON_STRING >cypress/fixtures/users/$USERNAME.json
	echo "KC fakeLogin file $USERNAME.json has been generated"
done
exit 0
