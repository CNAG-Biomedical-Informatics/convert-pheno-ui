#!/bin/bash
CERTS_URL="https://client/auth/realms/$KC_REALM/protocol/openid-connect/certs"
echo getting public key from $CERTS_URL

echo "=== DEBUG: KC_PUBLIC_KEY start ==="
KC_PUBLIC_KEY=$(curl -sSk $CERTS_URL | jq -r ".keys[] | .x5c[0]")
echo $KC_PUBLIC_KEY
echo "=== DEBUG: KC_PUBLIC_KEY end ==="

export KC_PUBLIC_KEY=$KC_PUBLIC_KEY
echo "=== DEBUG: KC_PUBLIC_KEY env var start ==="
echo $KC_PUBLIC_KEY
echo "=== DEBUG: KC_PUBLIC_KEY env var end ==="
exec gunicorn --conf server/config/gunicorn_conf.py server.app:app
