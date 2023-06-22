!!! Bug "Experimental"
    REDCap conversion is still experimental. It only works with controlled REDCap projects.

**REDCap** stands for **R**esearch **E**lectronic **D**ata **Cap**ture. REDCap [documentation](https://www.project-redcap.org).

## REDCap as input

REDCap projects are inherently **"free format"**, meaning the project creator has the flexibility to determine the identifiers for variables, data dictionaries, and other elements.

!!! Quote "REDCap project creation user’s guide"
    _“We always recommend reviewing your variable names with a statistician or whoever will be analyzing your data. This is especially important if this is the first time you are building a database.”_

Due to the flexibility of REDCap projects, it can be challenging to develop a solution that accommodates the wide range of possibilities. Nonetheless, we were able to successfully convert data from REDCap project exports to both Beacon v2 and Phenopackets v2 formats using a mapping file. These conversions were achieved as part of the [3TR Project](https://3tr-imi.eu).

!!! Warning "About REDCap longitudinal data"
         REDCap stores `event` information, however, [Beacon v2 Models](https://docs.genomebeacons.org/schemas-md/individuals_defaultSchema) currently lack a way to store longitudinal data. To address this, we will store `event` data under the propery `info`.

=== "Web UI"

    !!! Tip "About REDCap export formats"
        REDCap provides various options for exporting data. We accept the option "All data (all records and fields)" including CSV and Microsoft Excel format, along with a accompanying data dictionary in CSV format. Exportation in REDCap CDISC ODM (XML) format is discussed in the section on [CDISC-ODM](cdisc-odm.md).

    We'll need three files:

    1. REDCap export (CSV)
    2. REDCap data dictionary (CSV)
    3. Mapping file (YAML or JSON)

    !!! Question "Can CSV files be compressed?"
        For securities reason we do not allow the upload of compressed files.

    !!! Abstract "Ontologies used"
        During the data transformation process, **ontologies** are automatically added to standardize the content of the variables. We use [NCI Thesaurus](https://ncithesaurus.nci.nih.gov/ncitbrowser), [ICD-10](https://icd.who.int/browse10), and data from [Athena-OHDSI](https://athena.ohdsi.org/search-terms/start).

=== "API"

     The data will be sent as `POST` to the API's URL
    ! API documentation still in progress

    ```
    {
    "data": {...}
    }
    ```
