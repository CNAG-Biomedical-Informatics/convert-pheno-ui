const table = [
  {
    diseases: [
      {
        ageOfOnset: {
          ageRange: {
            end: {
              iso8601duration: "P9Y",
            },
            start: {
              iso8601duration: "P0Y",
            },
          },
        },
        diseaseCode: {
          id: "NCIT:C3138",
          label: "Inflammatory Bowel Disease",
        },
        familyHistory: false,
        severity: {
          id: "NCIT:NA000",
          label: "NA",
        },
        stage: {
          id: "NCIT:NA000",
          label: "NA",
        },
      },
    ],
    ethnicity: {
      id: "NCIT:C41261",
      label: "Caucasian",
    },
    exposures: [
      {
        ageAtExposure: {
          id: "NCIT:NA0000",
          label: "NA",
        },
        date: "1900-01-01",
        duration: "P999Y",
        exposureCode: {
          id: "NCIT:C2190",
          label: "Alcohol",
        },
        unit: {
          id: "NCIT:C17998",
          label: "Unknown",
        },
        value: 4,
      },
      {
        ageAtExposure: {
          id: "NCIT:NA0000",
          label: "NA",
        },
        date: "1900-01-01",
        duration: "P999Y",
        exposureCode: {
          id: "NCIT:C154329",
          label: "Smoking",
        },
        unit: {
          id: "NCIT:C65108",
          label: "Never Smoker",
        },
        value: 0,
      },
    ],
    id: "107:week_0_arm_1",
    info: {
      age: {
        iso8601duration: "P2Y",
      },
      consent: {
        "Field Label": "Patient consented to BFU+/CED?",
        "Field Note": "",
        "Field Type": "yesno",
        value: 1,
      },
      consent_date: {
        "Field Label": "Date of consent",
        "Field Note": "",
        "Field Type": "text",
        value: "25.10.2020",
      },
      consent_devices: {
        "Field Label": "Patient consented to device studies?",
        "Field Note": "",
        "Field Type": "yesno",
        value: 0,
      },
      consent_noneu: {
        "Field Label":
          "Patient consented to transfer of data/samples to non-EU countries?",
        "Field Note": "",
        "Field Type": "yesno",
        value: 0,
      },
      consent_recontact: {
        "Field Label":
          "Patient consented for the possibility to be recontacted for study purposes?",
        "Field Note": "",
        "Field Type": "yesno",
        value: 1,
      },
      consent_week2_endo: {
        "Field Label": "Patient consented for endoscopy at week 2?",
        "Field Note": "",
        "Field Type": "yesno",
        value: 0,
      },
      consents_and_demographics_complete: {
        "Field Label": null,
        "Field Note": null,
        "Field Type": null,
        value: 2,
      },
      diet: "Unknown",
      education: "high-school diploma (Fachhochschulreife/Abitur)",
      metaData: null,
      redcap_event_name: "week_0_arm_1",
      study_id: "107",
    },
    interventionsOrProcedures: [
      {
        bodySite: {
          id: "NCIT:C12736",
          label: "intestine",
        },
        dateOfProcedure: "1900-01-01",
        procedureCode: {
          id: "NCIT:NA0000",
          label: "NA",
        },
      },
    ],
    measures: [
      {
        assayCode: {
          id: "NCIT:C51948",
          label: "Leukocyte Count",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 200,
              low: 0,
            },
            unit: {
              id: "NCIT:C67242",
              label: "Cells per Microliter",
            },
            value: 8.91,
          },
        },
        notes: "leucocytes, Field Label=Leucocytes",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64848",
          label: "Hemoglobin Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 20,
              low: 0,
            },
            unit: {
              id: "NCIT:C64783",
              label: "Gram per Deciliter",
            },
            value: 11.2,
          },
        },
        notes: "hemoglobin, Field Label=Hemoglobin",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64796",
          label: "Hematocrit Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 100,
              low: 0,
            },
            unit: {
              id: "NCIT:C25613",
              label: "Percentage",
            },
            value: 34,
          },
        },
        notes: "hematokrit, Field Label=Hematokrit",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C51951",
          label: "Platelet Count",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 2000,
              low: 0,
            },
            unit: {
              id: "NCIT:C67242",
              label: "Cells per Microliter",
            },
            value: 442,
          },
        },
        notes: "thrombocytes, Field Label=Thrombocytes",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64547",
          label: "Creatinine Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:C48508",
              label: "Micromole per Liter",
            },
            value: 76,
          },
        },
        notes: "creatinine, Field Label=Creatinine",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C90505",
          label: "Glomerular Filtration Rate",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 200,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 123,
          },
        },
        notes: "gfr, Field Label=GFR CKD-Epi",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C38037",
          label: "Total Bilirubin Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:C48508",
              label: "Micromole per Liter",
            },
            value: 3.5,
          },
        },
        notes: "bilirubin, Field Label=Bilirubin",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C55098",
          label: "Serum Glutamic Pyruvic Transaminase, CTCAE",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 18,
          },
        },
        notes: "gpt, Field Label=GPT",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C61025",
          label: "Serum Gamma Glutamyl Transpeptidase Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 19,
          },
        },
        notes: "ggt, Field Label=gammaGT",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C117748",
          label: "Lipase Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 46,
          },
        },
        notes: "lipase, Field Label=Lipase",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64548",
          label: "C-Reactive Protein Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 1000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 1.77,
          },
        },
        notes: "crp, Field Label=CRP",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C74679",
          label: "Iron Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 1000,
              low: 0,
            },
            unit: {
              id: "NCIT:C48508",
              label: "Micromole per Liter",
            },
            value: 3.7,
          },
        },
        notes: "iron, Field Label=Iron",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C20451",
          label: "Interleukin-6",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:C67327",
              label: "Nanogram per Liter",
            },
            value: 2.3,
          },
        },
        notes: "il6, Field Label=IL-6",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
    ],
    phenotypicFeatures: [
      {
        featureType: {
          id: "NCIT:NA0000",
          label: "NA",
        },
        notes: "rectal_bleeding, Field Label=Rectal bleeding score",
      },
    ],
    sex: {
      id: "NCIT:C20197",
      label: "Male",
    },
    treatments: [
      {
        _info: {
          dose: null,
          drug: "budesonide",
          drug_name: "budesonide",
          duration: null,
          field: "budesonide_oral_status",
          route: "oral",
          start: null,
          status: "former treatment",
          value: "2",
        },
        ageAtOnset: {
          age: {
            iso8601duration: "P999Y",
          },
        },
        cumulativeDose: {
          unit: {
            id: "NCIT:00000",
            label: "NA",
          },
          value: -1,
        },
        doseIntervals: [],
        routeOfAdministration: {
          id: "NCIT:C38288",
          label: "Oral Route of Administration",
        },
        treatmentCode: {
          id: "NCIT:C1027",
          label: "Budesonide",
        },
      },
      {
        _info: {
          dose: null,
          drug: "budesonide",
          drug_name: "budesonide",
          duration: null,
          field: "budesonide_rectal_status",
          route: "rectal",
          start: null,
          status: "never treated",
          value: "1",
        },
        ageAtOnset: {
          age: {
            iso8601duration: "P999Y",
          },
        },
        cumulativeDose: {
          unit: {
            id: "NCIT:00000",
            label: "NA",
          },
          value: -1,
        },
        doseIntervals: [],
        routeOfAdministration: {
          id: "NCIT:C38295",
          label: "Rectal Route of Administration",
        },
        treatmentCode: {
          id: "NCIT:C1027",
          label: "Budesonide",
        },
      },
      {
        _info: {
          dose: null,
          drug: "prednisolone",
          drug_name: "prednisolone",
          duration: null,
          field: "prednisolone_status",
          route: "oral",
          start: null,
          status: "current treatment",
          value: "3",
        },
        ageAtOnset: {
          age: {
            iso8601duration: "P999Y",
          },
        },
        cumulativeDose: {
          unit: {
            id: "NCIT:00000",
            label: "NA",
          },
          value: -1,
        },
        doseIntervals: [],
        routeOfAdministration: {
          id: "NCIT:C38288",
          label: "Oral Route of Administration",
        },
        treatmentCode: {
          id: "NCIT:C769",
          label: "Prednisolone",
        },
      },
      {
        _info: {
          dose: null,
          drug: "asa",
          drug_name: "aspirin",
          duration: null,
          field: "asa_oral_status",
          route: "oral",
          start: null,
          status: "former treatment",
          value: "2",
        },
        ageAtOnset: {
          age: {
            iso8601duration: "P999Y",
          },
        },
        cumulativeDose: {
          unit: {
            id: "NCIT:00000",
            label: "NA",
          },
          value: -1,
        },
        doseIntervals: [],
        routeOfAdministration: {
          id: "NCIT:C38288",
          label: "Oral Route of Administration",
        },
        treatmentCode: {
          id: "NCIT:C287",
          label: "Aspirin",
        },
      },
      {
        _info: {
          dose: null,
          drug: "asa",
          drug_name: "aspirin",
          duration: null,
          field: "asa_rectal_status",
          route: "rectal",
          start: null,
          status: "never treated",
          value: "1",
        },
        ageAtOnset: {
          age: {
            iso8601duration: "P999Y",
          },
        },
        cumulativeDose: {
          unit: {
            id: "NCIT:00000",
            label: "NA",
          },
          value: -1,
        },
        doseIntervals: [],
        routeOfAdministration: {
          id: "NCIT:C38295",
          label: "Rectal Route of Administration",
        },
        treatmentCode: {
          id: "NCIT:C287",
          label: "Aspirin",
        },
      },
      {
        _info: {
          dose: null,
          drug: "aza",
          drug_name: "azathioprine",
          duration: null,
          field: "aza_status",
          route: "oral",
          start: null,
          status: "never treated",
          value: "1",
        },
        ageAtOnset: {
          age: {
            iso8601duration: "P999Y",
          },
        },
        cumulativeDose: {
          unit: {
            id: "NCIT:00000",
            label: "NA",
          },
          value: -1,
        },
        doseIntervals: [],
        routeOfAdministration: {
          id: "NCIT:C38288",
          label: "Oral Route of Administration",
        },
        treatmentCode: {
          id: "NCIT:C290",
          label: "Azathioprine",
        },
      },
      {
        _info: {
          dose: null,
          drug: "mtx",
          drug_name: "methotrexate",
          duration: null,
          field: "mtx_status",
          route: "oral",
          start: null,
          status: "never treated",
          value: "1",
        },
        ageAtOnset: {
          age: {
            iso8601duration: "P999Y",
          },
        },
        cumulativeDose: {
          unit: {
            id: "NCIT:00000",
            label: "NA",
          },
          value: -1,
        },
        doseIntervals: [],
        routeOfAdministration: {
          id: "NCIT:C38288",
          label: "Oral Route of Administration",
        },
        treatmentCode: {
          id: "NCIT:C642",
          label: "Methotrexate",
        },
      },
      {
        _info: {
          dose: null,
          drug: "mp",
          drug_name: "mercaptopurine",
          duration: null,
          field: "mp_status",
          route: "oral",
          start: null,
          status: "never treated",
          value: "1",
        },
        ageAtOnset: {
          age: {
            iso8601duration: "P999Y",
          },
        },
        cumulativeDose: {
          unit: {
            id: "NCIT:00000",
            label: "NA",
          },
          value: -1,
        },
        doseIntervals: [],
        routeOfAdministration: {
          id: "NCIT:C38288",
          label: "Oral Route of Administration",
        },
        treatmentCode: {
          id: "NCIT:C195",
          label: "Mercaptopurine",
        },
      },
    ],
  },
  {
    diseases: [
      {
        diseaseCode: {
          id: "NCIT:C3138",
          label: "Inflammatory Bowel Disease",
        },
        severity: {
          id: "NCIT:NA000",
          label: "NA",
        },
        stage: {
          id: "NCIT:NA000",
          label: "NA",
        },
      },
    ],
    id: "107:week_14_arm_1",
    info: {
      metaData: null,
      redcap_event_name: "week_14_arm_1",
      study_id: "107",
    },
    measures: [
      {
        assayCode: {
          id: "NCIT:C51948",
          label: "Leukocyte Count",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 200,
              low: 0,
            },
            unit: {
              id: "NCIT:C67242",
              label: "Cells per Microliter",
            },
            value: 9.24,
          },
        },
        notes: "leucocytes, Field Label=Leucocytes",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64848",
          label: "Hemoglobin Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 20,
              low: 0,
            },
            unit: {
              id: "NCIT:C64783",
              label: "Gram per Deciliter",
            },
            value: 14.6,
          },
        },
        notes: "hemoglobin, Field Label=Hemoglobin",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64796",
          label: "Hematocrit Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 100,
              low: 0,
            },
            unit: {
              id: "NCIT:C25613",
              label: "Percentage",
            },
            value: 43.4,
          },
        },
        notes: "hematokrit, Field Label=Hematokrit",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C51951",
          label: "Platelet Count",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 2000,
              low: 0,
            },
            unit: {
              id: "NCIT:C67242",
              label: "Cells per Microliter",
            },
            value: 297,
          },
        },
        notes: "thrombocytes, Field Label=Thrombocytes",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64547",
          label: "Creatinine Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:C48508",
              label: "Micromole per Liter",
            },
            value: 86,
          },
        },
        notes: "creatinine, Field Label=Creatinine",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C90505",
          label: "Glomerular Filtration Rate",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 200,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 106,
          },
        },
        notes: "gfr, Field Label=GFR CKD-Epi",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C38037",
          label: "Total Bilirubin Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:C48508",
              label: "Micromole per Liter",
            },
            value: 3.9,
          },
        },
        notes: "bilirubin, Field Label=Bilirubin",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C55098",
          label: "Serum Glutamic Pyruvic Transaminase, CTCAE",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 26,
          },
        },
        notes: "gpt, Field Label=GPT",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C61025",
          label: "Serum Gamma Glutamyl Transpeptidase Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 28,
          },
        },
        notes: "ggt, Field Label=gammaGT",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C117748",
          label: "Lipase Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 46,
          },
        },
        notes: "lipase, Field Label=Lipase",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64548",
          label: "C-Reactive Protein Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 1000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 6.17,
          },
        },
        notes: "crp, Field Label=CRP",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C74679",
          label: "Iron Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 1000,
              low: 0,
            },
            unit: {
              id: "NCIT:C48508",
              label: "Micromole per Liter",
            },
            value: 11.5,
          },
        },
        notes: "iron, Field Label=Iron",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C20451",
          label: "Interleukin-6",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:C67327",
              label: "Nanogram per Liter",
            },
            value: 3.24,
          },
        },
        notes: "il6, Field Label=IL-6",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
    ],
    sex: {
      id: "NCIT:C20197",
      label: "Male",
    },
  },
  {
    diseases: [
      {
        diseaseCode: {
          id: "NCIT:C3138",
          label: "Inflammatory Bowel Disease",
        },
        severity: {
          id: "NCIT:NA000",
          label: "NA",
        },
        stage: {
          id: "NCIT:NA000",
          label: "NA",
        },
      },
    ],
    id: "107:week_2_arm_1",
    info: {
      metaData: null,
      redcap_event_name: "week_2_arm_1",
      study_id: "107",
    },
    measures: [
      {
        assayCode: {
          id: "NCIT:C51948",
          label: "Leukocyte Count",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 200,
              low: 0,
            },
            unit: {
              id: "NCIT:C67242",
              label: "Cells per Microliter",
            },
            value: 19.05,
          },
        },
        notes: "leucocytes, Field Label=Leucocytes",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64848",
          label: "Hemoglobin Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 20,
              low: 0,
            },
            unit: {
              id: "NCIT:C64783",
              label: "Gram per Deciliter",
            },
            value: 11.3,
          },
        },
        notes: "hemoglobin, Field Label=Hemoglobin",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64796",
          label: "Hematocrit Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 100,
              low: 0,
            },
            unit: {
              id: "NCIT:C25613",
              label: "Percentage",
            },
            value: 36.8,
          },
        },
        notes: "hematokrit, Field Label=Hematokrit",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C51951",
          label: "Platelet Count",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 2000,
              low: 0,
            },
            unit: {
              id: "NCIT:C67242",
              label: "Cells per Microliter",
            },
            value: 365,
          },
        },
        notes: "thrombocytes, Field Label=Thrombocytes",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64547",
          label: "Creatinine Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:C48508",
              label: "Micromole per Liter",
            },
            value: 74,
          },
        },
        notes: "creatinine, Field Label=Creatinine",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C90505",
          label: "Glomerular Filtration Rate",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 200,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 122,
          },
        },
        notes: "gfr, Field Label=GFR CKD-Epi",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C38037",
          label: "Total Bilirubin Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:C48508",
              label: "Micromole per Liter",
            },
            value: 7.3,
          },
        },
        notes: "bilirubin, Field Label=Bilirubin",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C55098",
          label: "Serum Glutamic Pyruvic Transaminase, CTCAE",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 68,
          },
        },
        notes: "gpt, Field Label=GPT",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C61025",
          label: "Serum Gamma Glutamyl Transpeptidase Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 39,
          },
        },
        notes: "ggt, Field Label=gammaGT",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C117748",
          label: "Lipase Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 51,
          },
        },
        notes: "lipase, Field Label=Lipase",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C64548",
          label: "C-Reactive Protein Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 1000,
              low: 0,
            },
            unit: {
              id: "NCIT:NA0000",
              label: "NA",
            },
            value: 0.6,
          },
        },
        notes: "crp, Field Label=CRP",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C74679",
          label: "Iron Measurement",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 1000,
              low: 0,
            },
            unit: {
              id: "NCIT:C48508",
              label: "Micromole per Liter",
            },
            value: 3.4,
          },
        },
        notes: "iron, Field Label=Iron",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
      {
        assayCode: {
          id: "NCIT:C20451",
          label: "Interleukin-6",
        },
        date: "1900-01-01",
        measurementValue: {
          quantity: {
            referenceRange: {
              high: 10000,
              low: 0,
            },
            unit: {
              id: "NCIT:C67327",
              label: "Nanogram per Liter",
            },
            value: 2.37,
          },
        },
        notes: "il6, Field Label=IL-6",
        procedure: {
          procedureCode: {
            id: "NCIT:C27232",
            label: "Blood Test Result",
          },
        },
      },
    ],
    phenotypicFeatures: [
      {
        featureType: {
          id: "NCIT:NA0000",
          label: "NA",
        },
        notes: "rectal_bleeding, Field Label=Rectal bleeding score",
      },
    ],
    sex: {
      id: "NCIT:C20197",
      label: "Male",
    },
  },
];
export default table;
