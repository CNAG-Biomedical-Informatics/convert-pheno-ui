/**
  Home component

  This file is part of convert-pheno-ui

  Last Modified: Jun/21/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { useTheme } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import faqData from "../../../assets/faqData.yaml";
console.log(faqData);

const testMd = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

console.log(testMd);
console.log(faqData[1].answer);

export default function Faq() {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h3">Frequently Asked Questions</Typography>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {faq.answer_type == "markdown" ? (
              <ReactMarkdown
                children={faq.answer}
                remarkPlugins={[remarkGfm]}
              />
            ) : (
              <Typography>{faq.answer}</Typography>
            )}
            {faq.img && <img src={faq.img} alt="FAQ Image" />}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
