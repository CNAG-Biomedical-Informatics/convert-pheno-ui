docker run --name cp-pg -e POSTGRES_PASSWORD=postgres -d postgresFLASK_APP=server.app.py FLASK_DEBUG=1 FLASK_RUN_PORT=5001 flask run# convert-pheno-ui

<p align="left">
  <a href="https://github.com/cnag-biomedical-informatics/convert-pheno"><img src="https://github.com/cnag-biomedical-informatics/convert-pheno/blob/main/docs/img/CP-logo.png" width="220" alt="Convert-Pheno"></a>
  <a href="https://github.com/cnag-biomedical-informatics/convert-pheno"><img src="https://github.com/cnag-biomedical-informatics/convert-pheno/blob/main/docs/img/CP-text.png" width="500" alt="Convert-Pheno"></a>
</p>
<p align="center">
    <em>A software toolkit for the interconversion of standard data models for phenotypic data</em>
</p>

[![Docker build server](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/actions/workflows/docker-build-server.yml/badge.svg)](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/actions/workflows/docker-build-server.yml)
[![Docker build client](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/actions/workflows/docker-build-client.yml/badge.svg)](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/actions/workflows/docker-build-client.yml)
![version](https://img.shields.io/badge/version-0.0.0_beta-orange)
[![License: GPL-3.0](https://img.shields.io/pypi/l/fpvgcc.svg)](https://www.gnu.org/licenses/gpl-3.0.en.html)

**Documentation**: <a href="https://cnag-biomedical-informatics.github.io/convert-pheno" target="_blank">https://cnag-biomedical-informatics.github.io/convert-pheno</a>

**Web APP Playground**: <a href="https://convert-pheno.cnag.cat" target="_blank">https://convert-pheno.cnag.cat</a>

**CLI Source Code**: <a href="https://github.com/cnag-biomedical-informatics/convert-pheno" target="_blank">https://github.com/cnag-biomedical-informatics/convert-pheno</a>

# NAME

**UNDER DEVELOPMENT**

convert-pheno-ui - A web application for the interconversion of standard data models for phenotypic data

# DESCRIPTION

`convert-pheno-ui` is a web-interface for the CPAN's module [Convert::Pheno](https://metacpan.org/pod/Convert%3A%3APheno).

The module will be uploaded to CPAN once the paper is submitted.

# SUMMARY

A web-interface on top of [Convert::Pheno](https://metacpan.org/pod/Convert%3A%3APheno) to interconvert common data models for phenotypic data

# INSTALLATION

## Containerized

### Method 1: Using Docker compose (recommended)

1. Install [Docker](https://docs.docker.com/get-docker/) and [Docker compose](https://docs.docker.com/compose/install/)
2. Clone the repository
3. rename the file env.example to .env and fill in the variables
4. Run `docker-compose up -d`

### Method 2: Using Docker

Please download the Dockerfiles from the repo:

```shell
wget https://raw.githubusercontent.com/cnag-biomedical-informatics/convert-pheno/main/Dockerfile
wget https://raw.githubusercontent.com/CNAG-Biomedical-Informatics/convert-pheno-ui/main/convertPheno_server/Dockerfile
wget https://raw.githubusercontent.com/CNAG-Biomedical-Informatics/convert-pheno-ui/main/convertPheno_client/Dockerfile
```

And then run:

<!-- TODO -->
<!-- The environment vars are still missing -->

```shell
docker build -t cnag/convert-pheno:latest .
docker build -t cnag/convert-pheno-ui-server:latest .
docker build -t cnag/convert-pheno-ui-client:latest .
docker run --name cp-pg -e POSTGRES_PASSWORD=<insert_password> -d postgres
```

## Non containerized

### Pre-requisites:

- Install and run a PostgreSQL database server (>= 9.5)

- Install [Convert::Pheno](https://metacpan.org/pod/Convert%3A%3APheno) from CPAN or build it from [source](https://github.com/cnag-biomedical-informatics/convert-pheno)

- Install and configure [Keycloak](https://www.keycloak.org/)

- Clone the repository

### Run the server:

```shell
cd convertPheno_server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
FLASK_APP=server.app.py FLASK_RUN_PORT=5000 flask run
```

### Run the client:

```shell
cd convertPheno_client
npm install
npm run vite
```

### System requirements:

    * Ideally a Debian-based distribution (Ubuntu or Mint), but any other (e.g., CentOs, OpenSuse) should do as well.
    * Perl 5 (>= 5.10 core; installed by default in most Linux distributions). Check the version with "perl -v".
    * >= 4GB of RAM
    * 1 core
    * At least 16GB HDD

# CITATION

The author requests that any published work that utilizes `Convert-Pheno` includes a cite to the the following reference:

Rueda, M; Leist, IC et al., (2023). Convert-Pheno: A software toolkit for the interconversion of standard data models for phenotypic data \[Software\]. Available from https://github.com/cnag-biomedical-informatics/convert-pheno

# AUTHOR

Written by Ivo Christopher Leist, PhD student at CNAG [https://www.cnag.crg.eu](https://www.cnag.crg.eu).

# COPYRIGHT AND LICENSE

Copyright (C) 2022-2023, Ivo Christopher Leist - CNAG.
