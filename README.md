<p align="left">
  <a href="https://github.com/cnag-biomedical-informatics/convert-pheno"><img src="https://github.com/cnag-biomedical-informatics/convert-pheno/blob/main/docs/img/CP-logo.png" width="220" alt="Convert-Pheno"></a>
  <a href="https://github.com/cnag-biomedical-informatics/convert-pheno"><img src="https://github.com/cnag-biomedical-informatics/convert-pheno/blob/main/docs/img/CP-text.png" width="500" alt="Convert-Pheno"></a>
</p>
<p align="center">
    <em>A software toolkit for the interconversion of standard data models for phenotypic data</em>
</p>

[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m794601507-a686af3c42ebb3ff3f2673b2)](https://stats.uptimerobot.com/4nrjwuYQPm)
[![Docker build server](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/actions/workflows/docker-build-server.yml/badge.svg)](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/actions/workflows/docker-build-server.yml)
[![Docker build client](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/actions/workflows/docker-build-client.yml/badge.svg)](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/actions/workflows/docker-build-client.yml)
[![codecov](https://codecov.io/gh/CNAG-Biomedical-Informatics/convert-pheno-ui/branch/main/graph/badge.svg?token=VJB5TM9LQW)](https://codecov.io/gh/CNAG-Biomedical-Informatics/convert-pheno-ui)
![version](https://img.shields.io/badge/version-0.0.0_beta-orange)
[![License: GPL-3.0](https://img.shields.io/pypi/l/fpvgcc.svg)](https://www.gnu.org/licenses/gpl-3.0.en.html)
[![Documentation Status](https://github.com/cnag-biomedical-informatics/convert-pheno-ui/actions/workflows/documentation.yml/badge.svg)](https://github.com/cnag-biomedical-informatics/convert-pheno-ui/actions/workflows/documentation.yml)

**Documentation**: <a href="https://cnag-biomedical-informatics.github.io/convert-pheno-ui" target="_blank">https://cnag-biomedical-informatics.github.io/convert-pheno-ui</a>

**Web APP Playground**: <a href="https://convert-pheno.cnag.cat" target="_blank">https://convert-pheno.cnag.cat</a>

**CLI Source Code**: <a href="https://github.com/cnag-biomedical-informatics/convert-pheno" target="_blank">https://github.com/cnag-biomedical-informatics/convert-pheno</a>

---

`convert-pheno-ui` is a web-interface for the CPAN's module [Convert::Pheno](https://metacpan.org/pod/Convert%3A%3APheno)
which is a software toolkit for the interconversion of standard data models for phenotypic data.

The module will be uploaded to CPAN once the paper is submitted.

[![Convert-Pheno-UI](docs/ui.gif)](docs/ui.gif)

# Getting Started

### General pre-requisite:

- Ideally a unix (GNU/Linux, MacOS) based distribution.
  Windows with [WSL (Windows Subsystem for Linux)](https://learn.microsoft.com/en-us/windows/wsl)
  enabled or [Docker Deskop](https://docs.docker.com/desktop/install/windows-install/) should work as well - not tested

- [Docker](https://docs.docker.com/get-docker/) and [Docker compose](https://docs.docker.com/compose/install/) installed

### Quick Start

**_no SSL and user authentication_**
0. git clone this repo and then navigate into the folder convert-pheno-ui
1. rename the file [example.env](example.env) to .env and fill in the variables
2. Run `docker compose up -d`
3. Open your browser and go to `http://localhost:4173`

### For self-hosters:

**_SSL and keycloak-based user authentication_**

Convert-Pheno is designed to be run as a collection of microservices.
Please consult [dev_docs/how_to_self_host_w_keycloak_login_enabled.md](dev_docs/how_to_self_host_w_keycloak_login_enabled.md)
how to prepare your environment and run the services.

### CITATION

The author requests that any published work that utilizes `Convert-Pheno-UI` includes a cite to the the following reference:

Rueda, M; Leist, IC et al., (2023). Convert-Pheno: A software toolkit for the interconversion of standard data models for phenotypic data \[Software\]. Available from https://github.com/cnag-biomedical-informatics/convert-pheno

### AUTHOR

Written by Ivo Christopher Leist, PhD student at CNAG [https://www.cnag.crg.eu](https://www.cnag.crg.eu).

### COPYRIGHT AND LICENSE

Copyright (C) 2022-2023, Ivo Christopher Leist - CNAG.

GPLv3 - GNU General Public License v3.0
