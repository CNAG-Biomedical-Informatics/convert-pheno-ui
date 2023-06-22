
## Pre-requisites

- Ideally a unix (GNU/Linux, MacOS) based distribution
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose]() compose installed

## Hardware requirements

- 4GB of RAM
- 1 CPU core
- 16GB HDD

## Methods for running the UI
First get the latest version of the code from the repository
    ```
    git clone https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui.git
    ```

=== "Quick start (no SSL & user authentication)"

	- rename the file [example.env](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/blob/main/example.env) to `.env` and fill in the variables
	- Run ```docker compose up -d```
	- Open your browser and go to https://localhost most likely you will get a warning about the certificate, just accept it

=== "For self-hosters (SSL and keycloak-based user authentication)"

	Convert-Pheno is designed to be run as a collection of microservices.

	Please consult the [dev_docs](https://github.com/CNAG-Biomedical-Informatics/convert-pheno-ui/blob/main/dev_docs/how_to_self_host_w_keycloak_login_enabled.md) in the repository for more information.
