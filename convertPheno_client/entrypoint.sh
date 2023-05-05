#!/bin/sh
# https://dille.name/blog/2019/12/05/creating-advanced-entrypoints-for-containers/

set -e

# Run your pre-Nginx command here
echo "Running pre-Nginx command"
./replace_env_vars.sh

# Start the Nginx process in the background
echo "Starting Nginx"
nginx -g "daemon off;" &

# Wait for Nginx to start up
echo "Waiting for Nginx to start"
while ! curl -s localhost:80 >/dev/null; do
	sleep 1
done

# Finally, run the command that will keep the container running
echo "Container ready"
tail -f /dev/null
