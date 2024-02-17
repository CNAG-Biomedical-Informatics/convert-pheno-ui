FROM python:3.13.0a3-slim-bullseye AS base
ENV PATH /opt/venv/bin:$PATH
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

FROM base AS builder
RUN apt-get update && apt-get install -y --no-install-recommends \
    lsb-release \
    curl \
    gpg \
    jq

RUN mkdir -m 0755 -p /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
    && apt-get update && apt-get install -y \
    docker-ce-cli

RUN rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man \
    && apt-get clean

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
COPY server ./server
COPY ./server.sh .
CMD ["./server.sh"]

FROM builder AS prod
COPY --from=builder /opt/venv venv
RUN poetry install --no-interaction --no-root --only main,prod
ARG IGNORE_CACHE_FROM_HERE=unknown
RUN echo "IGNORE_CACHE_FROM_HERE=${IGNORE_CACHE_FROM_HERE}"

COPY server ./server
COPY ./server.sh .
COPY ./entrypoint.sh .

# Add user "dockeruser"
ARG UID=1000
ARG GID=1000
RUN groupadd -g "${GID}" dockeruser \
    && useradd --create-home --no-log-init -u "${UID}" -g "${GID}" dockeruser \
    && chown -R dockeruser:dockeruser /opt

RUN groupadd docker && usermod -aG docker dockeruser

# To use user "dockeruser" you have to add "dockeruser" to the docker group on your host system.
# Caution: The docker group is equivalent to the root so DO NOT do it on production!
# USER dockeruser
CMD ["./entrypoint.sh"]
