<p align="left">
  <a href="https://github.com/cnag-biomedical-informatics/convert-pheno"><img src="https://github.com/cnag-biomedical-informatics/convert-pheno/blob/main/docs/img/CP-logo.png" width="220" alt="Convert-Pheno"></a>
  <a href="https://github.com/cnag-biomedical-informatics/convert-pheno"><img src="https://github.com/cnag-biomedical-informatics/convert-pheno/blob/main/docs/img/CP-text.png" width="500" alt="Convert-Pheno"></a>
</p>
<p align="center">
    <em>A software toolkit for the interconversion of standard data models for phenotypic data</em>
</p>

![Uptime Robot status](https://img.shields.io/uptimerobot/status/m794601507-a686af3c42ebb3ff3f2673b2)
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

## General pre-requisites for deployment:

Ideally a unix (GNU/Linux, MacOS) based distribution.
Windows with [WSL (Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl) enabled should work as well - not tested

## Prepare the environment

The following steps are only for unix based systems.
It is tested on Ubuntu 22.04 LTS and CentOS Linux 7.

### Step 0: Clone the repository

### Step 1: Setting up a local domain

Add the following line to your `/etc/hosts` file:

```
127.0.0.1       <yourDomain>
```

### Step 2: SSL certificate for your domain

Get a certificate for your domain and place it in the folder `nginx_mountpoint/certs/` with the name `<yourDomain>.pem` and the key with the name `<yourDomain-key>.pem`.
you could generate a locally-trusted development certificate with e.g. [mkcert](https://github.com/FiloSottile/mkcert)

Command to generate a certificate using `mkcert`:

```shell
mkcert -install
mkcert -cert-file ./nginx_mountpoint/certs/<yourDomain>.pem -key-file ./nginx_mountpoint/certs/<yourDomain>-key.pem <yourDomain>
```

### Step 3: Configure nginx

Modify the file `nginx_mountpoint/templates` and replace the domain names in the following lines:

```
ssl_certificate /etc/nginx/convertpheno.local.dev.pem;
ssl_certificate_key /etc/nginx/convertpheno.local.dev-key.pem;
```

with your domain name.

## Containerized

1. Install [Docker](https://docs.docker.com/get-docker/) and [Docker compose](https://docs.docker.com/compose/install/)
2. rename the file [example.env](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/blob/main/example.env) to .env and fill in the variables
3. Run `docker-compose up -d`
4. Open your browser and go to `https://<yourDomain>/auth` to access the Keycloak admin console
5. Create a new user in the realm you defined in the .env file

## Non containerized

### General Pre-requisites:

- Install and run a PostgreSQL database server (>= 9.5)

- Install [Convert::Pheno](https://metacpan.org/pod/Convert%3A%3APheno) from CPAN or build it from [source](https://github.com/cnag-biomedical-informatics/convert-pheno)

- Install and configure [Keycloak](https://www.keycloak.org/)

### Run the server:

#### Server Pre-requisites:

- rename the file [convertPheno_server/example.env](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/blob/main/convertPheno_server/example.env) to .env and fill in the variables

```shell
cd convertPheno_server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
FLASK_APP=server.app.py FLASK_RUN_PORT=5000 flask run
```

### Run the client:

#### Client Pre-requisites:

- Install [Node.js](https://nodejs.org/en) (>= 14.15)
- rename the file [convertPheno_client/example.env](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/blob/main/convertPheno_client/example.env) to .env and fill in the variables

```shell
cd convertPheno_client
npm install
npm run vite
```

### System requirements:

- Unix based distribution (it is tested on Ubuntu 22.04 LTS and CentOS Linux 7)
- Python 3 (>= 3.6; installed by default in most Linux distributions). Check the version with "python3 -V".
- Perl 5 (>= 5.10 core; installed by default in most Linux distributions). Check the version with "perl -v".
- \>= 4GB of RAM
- 1 core
- At least 16GB HDD

# CITATION

The author requests that any published work that utilizes `Convert-Pheno-UI` includes a cite to the the following reference:

Rueda, M; Leist, IC et al., (2023). Convert-Pheno: A software toolkit for the interconversion of standard data models for phenotypic data \[Software\]. Available from https://github.com/cnag-biomedical-informatics/convert-pheno

# AUTHOR

Written by Ivo Christopher Leist, PhD student at CNAG [https://www.cnag.crg.eu](https://www.cnag.crg.eu).

# COPYRIGHT AND LICENSE

Copyright (C) 2022-2023, Ivo Christopher Leist - CNAG.
