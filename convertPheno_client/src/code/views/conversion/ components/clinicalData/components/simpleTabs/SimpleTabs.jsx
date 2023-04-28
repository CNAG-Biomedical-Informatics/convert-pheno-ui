/** 
  Simple Tabbed view component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";

const tabsMapping = {
  bff: "Beacon v2",
  pxf: "Phenopackets v2",
};

// not sure for what they are needed
const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      key={`simple-tabpanel-${index}`}
      role="tabpanel"
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Grid sx={{ p: 3 }}>{children}</Grid>}
    </div>
  );
};

export default function SimpleTabs(props) {
  const { outputFormats, tabValue, handleTabChanged, children } = props;
  const trueProps = Object.keys(outputFormats).filter(
    (prop) => outputFormats[prop]
  );
  return (
    <>
      <Tabs
        key={`simple-tabs-${tabValue}`}
        value={tabValue}
        onChange={handleTabChanged}
      >
        {trueProps.map((format, index) => {
          return <Tab label={tabsMapping[format]} {...a11yProps(index)} />;
        })}
      </Tabs>
      <Box sx={{ p: 3 }}>{children[0]}</Box>
      {trueProps.map((_, index) => {
        return (
          <TabPanel value={tabValue} index={index}>
            {children[1]}
          </TabPanel>
        );
      })}
    </>
  );
}
