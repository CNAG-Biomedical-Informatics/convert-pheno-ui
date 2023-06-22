**PXF** stands for **P**henotype e**X**change **F**ormat. Phenopackets v2 [documentation](https://phenopacket-schema.readthedocs.io/en/latest/basics.html).

<figure markdown>
   ![Phenopackets v2](https://www.ga4gh.org/wp-content/uploads/phenopachets-v2-final.jpeg){ width="500" }
   <figcaption>Figure extracted from www.ga4gh.org</figcaption>
</figure>

Phenopackets use [top-level](https://phenopacket-schema.readthedocs.io/en/latest/toplevel.html) elements in order to structure the information. We'll be focussing on the element **Phenopacket**.

!!! Tip "Browsing PXF vs `JSON` data"

    You can browse a public Phenopackets v2 file with the following **JSON viewers**:

    * [JSON Crack](https://jsoncrack.com/editor?json=https://raw.githubusercontent.com/cnag-biomedical-informatics/convert-pheno/main/t/pxf2bff/in/pxf.json)
    * [JSON Hero](https://jsonhero.io/new?url=https://raw.githubusercontent.com/cnag-biomedical-informatics/convert-pheno/main/t/pxf2bff/in/pxf.json)
    * [Datasette](https://lite.datasette.io/?json=https%3A%2F%2Fraw.githubusercontent.com%2Fcnag-biomedical-informatics%2Fconvert-pheno%2Fmain%2Ft%2Fomop2pxf%2Fout%2Fpxf.json#/data?sql=select+*+from+pxf)

## PXF as input ![PXF](https://avatars.githubusercontent.com/u/17553567?s=280&v=4){ width="20" }

=== "Web UI"

    The input has to be either a json file with one json object or an array of json objects

=== "API"

    The data will be sent as `POST` to the API's URL
    ! API documentation still in progress

    ```
    {
    "data": {...}
    }
    ```

Please find below examples of data:

=== "PXF (input)"
    ```json
    {
       "diseases" : [],
       "id" : "phenopacket_id.AUNb6vNX1",
       "measurements" : [
          {
             "assay" : {
                "id" : "LOINC:35925-4",
                "label" : "BMI"
             },
             "value" : {
                "quantity" : {
                   "unit" : {
                      "id" : "NCIT:C49671",
                      "label" : "Kilogram per Square Meter"
                   },
                   "value" : 26.63838307
                }
             }
          },
          {
             "assay" : {
                "id" : "LOINC:3141-9",
                "label" : "Weight"
             },
             "value" : {
                "quantity" : {
                   "unit" : {
                      "id" : "NCIT:C28252",
                      "label" : "Kilogram"
                   },
                   "value" : 85.6358
                }
             }
          },
          {
             "assay" : {
                "id" : "LOINC:8308-9",
                "label" : "Height-standing"
             },
             "value" : {
                "quantity" : {
                   "unit" : {
                      "id" : "NCIT:C49668",
                      "label" : "Centimeter"
                   },
                   "value" : 179.2973
                }
             }
          }
       ],
       "medicalActions" : [
          {
             "procedure" : {
                "code" : {
                   "id" : "OPCS4:L46.3",
                   "label" : "OPCS(v4-0.0):Ligation of visceral branch of abdominal aorta NEC"
                },
                "performed" : {
                   "timestamp" : "1900-01-01T00:00:00Z"
                }
             }
          }
       ],
       "metaData" : null,
       "subject" : {
          "id" : "HG00096",
          "sex" : "MALE",
          "vitalStatus" : {
             "status" : "ALIVE"
          }
       }
    }
    ```

=== "BFF (output)"
    ```json
    {
      "ethnicity": {
        "id": "NCIT:C42331",
        "label": "African"
      },
      "id": "HG00096",
      "info": {
        "eid": "fake1"
      },
      "interventionsOrProcedures": [
        {
          "procedureCode": {
            "id": "OPCS4:L46.3",
            "label": "OPCS(v4-0.0):Ligation of visceral branch of abdominal aorta NEC"
          }
        }
      ],
      "measures": [
        {
          "assayCode": {
            "id": "LOINC:35925-4",
            "label": "BMI"
          },
          "date": "2021-09-24",
          "measurementValue": {
            "quantity": {
              "unit": {
                "id": "NCIT:C49671",
                "label": "Kilogram per Square Meter"
              },
              "value": 26.63838307
            }
          }
        },
        {
          "assayCode": {
            "id": "LOINC:3141-9",
            "label": "Weight"
          },
          "date": "2021-09-24",
          "measurementValue": {
            "quantity": {
              "unit": {
                "id": "NCIT:C28252",
                "label": "Kilogram"
              },
              "value": 85.6358
            }
          }
        },
        {
          "assayCode": {
            "id": "LOINC:8308-9",
            "label": "Height-standing"
          },
          "date": "2021-09-24",
          "measurementValue": {
            "quantity": {
              "unit": {
                "id": "NCIT:C49668",
                "label": "Centimeter"
              },
              "value": 179.2973
            }
          }
        }
      ],
      "sex": {
        "id": "NCIT:C20197",
        "label": "male"
      }
    }
    ```
