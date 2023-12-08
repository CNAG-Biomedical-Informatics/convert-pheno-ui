/**
  Query Builder component

  This file is part of convert-pheno-ui

  Last modified: Dec/08/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React, { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Grid,
  IconButton,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Clear } from "@mui/icons-material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import DndBox from "./components/DndBox";
import DndTarget from "./components/DndTarget";

const RemoveButton = (props) => {
  const { id, removeField } = props;
  return (
    <IconButton
      onClick={() => removeField(id)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          removeField(id);
        }
      }}
    >
      <Clear />
    </IconButton>
  );
};

const TextFieldWithRemoveButton = (props) => {
  const { id, field, criteria, removeField, changeHandler } = props;
  const color = criteria == "inclusion" ? "#006C6C" : "#B73525";
  return (
    <TextField
      id={id}
      label={field}
      variant="outlined"
      onChange={changeHandler}
      InputProps={{
        endAdornment: <RemoveButton id={id} removeField={removeField} />,
      }}
      sx={{
        marginBottom: "10px",
        "& label.Mui-focused": {
          color: "inherit",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: color,
          },
        },
      }}
      focused
      fullWidth
    />
  );
};

const SelectDropdownWithRemoveButton = (props) => {
  const { id, field, criteria, removeField, changeHandler } = props;
  const color = criteria == "inclusion" ? "#006C6C" : "#B73525";

  const options = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  return (
    <TextField
      id={id}
      name={id}
      label={field}
      select
      variant="outlined"
      onChange={changeHandler}
      InputProps={{
        endAdornment: <RemoveButton id={id} removeField={removeField} />,
      }}
      sx={{
        marginBottom: "10px",
        "& label.Mui-focused": {
          color: "inherit",
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: color,
          },
        },
      }}
      focused
      fullWidth
    >
      {options.map((option) => (
        <MenuItem value={option.value} name={id}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default function QueryBuilder(props) {
  const {
    jsonDataKeys,
    droppedCriteria,
    handleApplyFilter,
    setFilter,
    setDropped,
    tabValue,
  } = props;

  const [filterCriteria, setFilterCriteria] = useState({
    inclusion: {},
    exclusion: {},
  });

  const [isOpen, setIsOpen] = useState(true);
  const [toggleButtonText, setToggleButtonText] =
    useState("Hide Query Builder");

  useEffect(() => {
    setFilterCriteria({
      inclusion: {},
      exclusion: {},
    });
  }, [tabValue]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setToggleButtonText(isOpen ? "Show Query Builder" : "Hide Query Builder");
  };

  const extractValues = (source) => {
    const [, criteria, field] = source.split("-");
    return { criteria, field };
  };

  const fieldChangeHandler = (event) => {
    const { criteria, field } = extractValues(
      event.target.id ? event.target.id : event.target.name
    );
    setFilterCriteria({
      ...filterCriteria,
      [criteria]: {
        ...filterCriteria[criteria],
        [field]: event.target.value,
      },
    });
  };

  const handleDropped = (target, item) => {
    const newDropped = [...droppedCriteria[target]]
      .filter((f) => f != item)
      .concat([item]);
    setDropped((prev) => ({ ...prev, [target]: newDropped }));
  };

  const renderDndBoxes = (keys, droppedCriteria, handleDropped) => {
    return (
      <>
        {keys.map((key, _) => {
          return (
            <DndBox
              // key makes sure that the DnDBoxes are reset when switching between the tabs
              key={`${tabValue}-${key}-dndBox`}
              name={key}
              droppedCriteria={droppedCriteria}
              handleDropped={handleDropped}
            />
          );
        })}
      </>
    );
  };

  const removeField = (id) => {
    const [, criteria, field] = id.split("-");
    const newDropped = [...droppedCriteria[criteria]].filter((f) => f != field);
    setDropped((prev) => ({ ...prev, [criteria]: newDropped }));
    setFilterCriteria((prev) => {
      const updatedFilterCriteria = JSON.parse(JSON.stringify(prev));
      delete updatedFilterCriteria[criteria][field];
      return updatedFilterCriteria;
    });
    setFilter((prev) => {
      const updatedFilter = JSON.parse(JSON.stringify(prev));
      delete updatedFilter[criteria][field];
      return updatedFilter;
    });
  };

  // TODO
  // split the filtering text field for measurements into 3 fields
  // field1: measurement name (e.g. "Leukocyte count") -> searchable dropdown
  // field2: operator ("=", "<", ">", "<=", ">=") -> dropdown
  // field3: value  (float) -> text field

  // TODO
  // look into key word detection libraries for a general filtering field:
  // e.g. "All female patients with a leukocyte count > 10"
  const renderFilterCriteria = (droppedCriteria, fieldChangeHandler) => {
    return ["inclusion", "exclusion"].map((criteria) => {
      const id = `${tabValue}-${criteria}`;
      return (
        <Grid item id={`${id}-gridItem-dndTarget`} xs={6}>
          <DndTarget
            id={`${id}-dndTarget`}
            criteria={criteria}
            dropped={droppedCriteria}
          />
          <Grid container id={`${id}-gridContainer-textFields`} spacing={1}>
            {droppedCriteria[criteria].map((field, _) => {
              if (field == "sex") {
                return (
                  <Grid item id={`${id}-gridItem-selectBox`} xs={6}>
                    <SelectDropdownWithRemoveButton
                      id={`${tabValue}-${criteria}-${field}`}
                      criteria={criteria}
                      removeField={removeField}
                      field={field}
                      changeHandler={fieldChangeHandler}
                    />
                  </Grid>
                );
              }

              return (
                <Grid item id={`${id}-gridItem-textFields`} xs={6}>
                  <TextFieldWithRemoveButton
                    id={`${tabValue}-${criteria}-${field}`}
                    criteria={criteria}
                    removeField={removeField}
                    field={field}
                    changeHandler={fieldChangeHandler}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      );
    });
  };

  const showApplyFilterButton = (filterCriteria) => {
    return (
      Object.keys(filterCriteria.inclusion).length > 0 ||
      Object.keys(filterCriteria.exclusion).length > 0
    );
  };

  return (
    <>
      <Button onClick={handleToggle}>
        {toggleButtonText} {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Collapse in={isOpen}>
        <Grid container border={1} borderRadius={1} padding={1}>
          <Typography variant="body2">
            {
              "Below are the table columns headers drag and drop them into one of the colored fields below and then enter the values to filter the table"
            }
          </Typography>
          <br />
          <br />
          <Grid item xs={12}>
            {renderDndBoxes(jsonDataKeys, droppedCriteria, handleDropped)}
          </Grid>
          <Grid container spacing={2}>
            {renderFilterCriteria(droppedCriteria, fieldChangeHandler)}
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={6}>
              {showApplyFilterButton(filterCriteria) && (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleApplyFilter(filterCriteria)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleApplyFilter(filterCriteria);
                    }
                  }}
                >
                  <Typography variant="h6">{"Apply Filter"}</Typography>
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}
