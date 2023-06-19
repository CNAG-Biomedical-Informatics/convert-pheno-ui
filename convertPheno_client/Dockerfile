#build environment
FROM node:18.14.0-alpine as build
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# ARG IGNORE_CACHE_FROM_HERE=unknown
# RUN echo "IGNORE_CACHE_FROM_HERE=${IGNORE_CACHE_FROM_HERE}"
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
RUN pnpm add vite

# ARG IGNORE_CACHE_FROM_HERE=unknown
# RUN echo "IGNORE_CACHE_FROM_HERE=${IGNORE_CACHE_FROM_HERE}"
COPY . .
RUN pnpm run build

#production environment
FROM nginx:1.23-alpine
RUN apk add openssl shadow
RUN apk add --no-cache npm
RUN npm install -g vite

# Create a new user and switch to that user
RUN addgroup -g 1000 -S nginxuser && adduser -u 1000 -S nginxuser -G nginxuser

EXPOSE 80
COPY --from=build /app/dist /usr/share/nginx/html
COPY replace_env_vars.sh /replace_env_vars.sh
COPY entrypoint_run_vite_preview.sh /entrypoint_run_vite_preview.sh
COPY entrypoint.sh /entrypoint.sh

RUN chown -R nginxuser:nginxuser /usr/share/nginx/html && \
	chown -R nginxuser:nginxuser /var/cache/nginx && \
	chown -R nginxuser:nginxuser /var/run && \
	chown -R nginxuser:nginxuser /etc/nginx/conf.d && \
	chown -R nginxuser:nginxuser /var/log/nginx

RUN touch /var/run/nginx.pid && \
	chown -R nginxuser:nginxuser /var/run/nginx.pid

USER nginxuser
CMD ["nginx", "-g", "daemon off;"]
