/**
  FileMappingModal component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.eu)

  License: GPL-3.0 license
*/

import React from "react";
import {
  Button,
  Box,
  Grid,
  Modal,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const FileMappingModal = (props) => {
  /*
  FileMappingModal component

  Props:
    - open (boolean): Whether the modal is open or closed
    - setOpen (function): Function to update open state and close/open the modal
    - uploadedFiles (array): List of files that have been uploaded

  Functionality:
    - Renders a Modal open/closed based on if there is a uploaded file mapping needed
    - Display a table where each uploaded file is mapped to a convert-pheno command option (inside a  dropdown menu)
    - The initial mapping is based on the file name and extension (e.g. *_dictionary -> redcap-dictionary)
    - The user can change the mapping by selecting a different option from the dropdown menu
    - The user needs to click a "Save" button to save the mapping -> update a state with the mapping

  Purpose:
    - To display a modal for mapping uploaded files to the correct convert-pheno command options:
      (-i(bff/omop/pxf/redcap/cdisc);-rcd|redcap-dictionary; -mapping-file;

  */
  const {
    open,
    uploadedFiles,
    setOpen,
    setUploadedFiles,
    setStartFileConversion,
  } = props;

  const handleRun = () => {
    setStartFileConversion(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, fileName) => {
    setUploadedFiles((prev) => {
      return {
        ...prev,
        [fileName]: [event.target.value, prev[fileName][1]],
      };
    });
  };

  // should not be hardcoded
  // better get the options from the server
  const options = ["input-file", "redcap-dictionary", "mapping-file"];

  // TODO
  // show only the mapping modal if three files have been uploaded +
  // the fileType is RedCap, OMOP or CDISC
  // otherwise show a message saying that the user needs to upload three files

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          color: "text.primary",
        }}
      >
        <Typography id="modal-title" variant="h6">
          File Mapping
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Please select the correct file type for each file
        </Typography>
        <br />
        <Grid container>
          {Object.keys(uploadedFiles).map((fileName) => (
            <>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {" "}
                  {fileName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <Select
                    value={uploadedFiles[fileName][0]}
                    onChange={(event) => handleChange(event, fileName)}
                  >
                    {options.map((option, _) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          ))}
        </Grid>
        <br />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleRun}>
            <Typography variant="body1">run</Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FileMappingModal;
