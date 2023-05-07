FROM python:3.10.6-slim-bullseye AS base
ENV PATH /opt/venv/bin:$PATH
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

FROM base AS builder
RUN apt-get update && apt-get install -y \
    lsb-release \
    curl \
    gpg \
    jq

RUN mkdir -m 0755 -p /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update && apt-get install -y \
    docker-ce-cli

WORKDIR /opt
RUN python -m venv venv
RUN pip install poetry
COPY pyproject.toml poetry.lock ./
RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction --no-root --only main

FROM builder AS dev
COPY --from=builder /opt/venv venv
# ARG IGNORE_CACHE_FROM_HERE=unknown
# RUN echo "IGNORE_CACHE_FROM_HERE=${IGNORE_CACHE_FROM_HERE}"
COPY server ./
COPY ./server.sh .
CMD ["./server.sh"]

FROM builder as prod
COPY --from=builder /opt/venv venv
RUN poetry install --no-interaction --no-root --only main,prod
ARG IGNORE_CACHE_FROM_HERE=unknown
RUN echo "IGNORE_CACHE_FROM_HERE=${IGNORE_CACHE_FROM_HERE}"
COPY server ./
COPY ./server.sh .
COPY ./entrypoint.sh .
ENV FLASK_ENV production
CMD ["./entrypoint.sh"]
