**OMOP-CDM** stands for **O**bservational **M**edical **O**utcomes **P**artnership **C**ommon **D**ata **M**odel. **OMOP-CDM** [documentation](https://www.ohdsi.org/data-standardization/the-common-data-model).

<figure markdown>
   ![OMOP-CDM](https://www.ohdsi.org/wp-content/uploads/2015/02/h243-ohdsi-logo-with-text.png){ width="400" }
   <figcaption>Image extracted from www.ohdsi.org</figcaption>
</figure>

The **OMOP-CDM** is designed to be database-agnostic, which means it can be implemented using different relational database management systems, with **PostgreSQL** being a popular choice.

!!! Warning "About OMOP-CDM longitudinal data"
         OMOP-CDM stores `visit_occurrence_id` for each `person_id` in the `VISIT_OCCURRENCE table`. However, [Beacon v2 Models](https://docs.genomebeacons.org/schemas-md/individuals_defaultSchema) currently lack a way to store longitudinal data. To address this, we added a property named `_visit` to each record, which stores visit information. This property will be serialized only if the `VISIT_OCCURRENCE` table is provided.

## OMOP as input

!!! Hint "OMOP-CDM supported version(s)"
         Currently, Convert-Pheno supports versions **5.3** and **5.4** of OMOP-CDM, and its prepared to support v6 once we can test the code with v6 projects.

=== "Web UI"

    Please ensure the [correct syntax](https://github.com/cnag-biomedical-informatics/convert-pheno#synopsis) is provided.

    !!! Warning "About large SQL files"
        Please note that the platform has a limit of **1GB** for SQL files.

        If your file is larger than that, please use the `convert-pheno` command-line interface. Click [here](https://cnag-biomedical-informatics.github.io/convert-pheno/omop-cdm/) for more information.


=== "API"

    The data will be sent as `POST` to the API's URL
    ! API documentation still in progress

    ```
    {
    "data": {...}
    }
    ```
