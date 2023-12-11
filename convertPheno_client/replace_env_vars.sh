#!/bin/sh
#
#   script to replace placeholders in the HTML file:
#
#   This file is part of convert-pheno-ui
#
#   Last modified: Dec/08/2023
#
#   Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)
#
#   License: GPL-3.0 license

echo "=== DEBUG: check if env variables are set ==="
echo $VITE_SECURITY
echo $VITE_API_URL
echo $VITE_KC_CONFIG
echo $MATOMO_TAG_MANAGER_URL
echo "=== DEBUG: End of check if env variables are set ==="

# Define the placeholders and their corresponding environment variables
PLACEHOLDERS="{{VITE_SECURITY}} {{VITE_API_URL}} {{VITE_KC_CONFIG}} {{VITE_FILEPOND_TIMEOUT}} {{MATOMO_TAG_MANAGER_URL}}"
ENV_VARS="VITE_SECURITY VITE_API_URL VITE_KC_CONFIG VITE_FILEPOND_TIMEOUT MATOMO_TAG_MANAGER_URL"

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
