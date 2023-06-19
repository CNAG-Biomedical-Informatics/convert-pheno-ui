#!/bin/sh
#
#   script to replace placeholders in the HTML file:
#
#   This file is part of convert-pheno-ui
#
#   Last Modified: Apr/28/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)
#
#   License: GPL-3.0 license

echo "=== DEBUG: check if env variables are set ==="
echo $VITE_SECURITY
echo $VITE_API_URL
echo $VITE_KC_CONFIG
echo "=== DEBUG: End of check if env variables are set ==="

# Make sure that the environment variable $VITE_SECURITY is either "true" or "false"
if [ "$VITE_SECURITY" != "true" ] && [ "$VITE_SECURITY" != "false" ]; then
	echo "ERROR: Environment variable VITE_SECURITY must be either \"true\" or \"false\"."
	exit 1
fi

# Define the placeholders and their corresponding environment variables
PLACEHOLDERS="{{VITE_SECURITY}} {{VITE_API_URL}} {{VITE_KC_CONFIG}}"
ENV_VARS="VITE_SECURITY VITE_API_URL VITE_KC_CONFIG"

# Replace the placeholders with the environment variable values
for placeholder in $PLACEHOLDERS; do
	for env_var in $ENV_VARS; do
		if [ "${placeholder}" = "{{${env_var}}}" ]; then
			value=$(eval echo "\$${env_var}")
			if [ ! -z "$value" ]; then
				sed -i "s|${placeholder}|${value}|g" /usr/share/nginx/html/index.html
			else
				echo "WARNING: Environment variable ${env_var} is not set."
			fi
		fi
	done
done
echo "=== DEBUG: /usr/share/nginx/html/index.html contents ==="
cat /usr/share/nginx/html/index.html
echo "=== DEBUG: End of index.html contents ==="
