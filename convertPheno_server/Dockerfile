FROM python:3.10-slim-bullseye AS dev

RUN apt-get update && apt-get install -y \
    curl && \
    gpg && \
    lsb-release

RUN mkdir -m 0755 -p /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update && apt-get install -y \
    docker-ce-cli

WORKDIR /usr/src
COPY ./requirements-mini.txt ./requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt
# ARG IGNORE_CACHE_FROM_HERE=unknown
# RUN echo "IGNORE_CACHE_FROM_HERE=${IGNORE_CACHE_FROM_HERE}"
COPY server ./server
COPY ./server.sh .

FROM tiangolo/meinheld-gunicorn-flask:python3.8 as prod

RUN apt-get update && apt-get install -y \
    lsb-release

RUN mkdir -m 0755 -p /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update && apt-get install -y \
    docker-ce-cli

WORKDIR /usr/src
COPY ./requirements-mini.txt ./requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt
ARG IGNORE_CACHE_FROM_HERE=unknown
RUN echo "IGNORE_CACHE_FROM_HERE=${IGNORE_CACHE_FROM_HERE}"
COPY server ./server
COPY ./server.sh .
ENV FLASK_ENV production
CMD ["gunicorn","--conf","server/config/gunicorn_conf.py","server.app:app"]
