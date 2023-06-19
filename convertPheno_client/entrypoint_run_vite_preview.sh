#!/bin/sh
/replace_env_vars.sh && \
vite preview --host --port 4173 --strictPort --outDir /usr/share/nginx/html
