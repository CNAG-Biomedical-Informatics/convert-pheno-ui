/**
  Main function for the convertPheno_client application.

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./code/Main";

// Warning:
// ReactDOM.render is no longer supported in React 18. Use createRoot instead.
// => tried to use createRoot, but with it keycloak runs into a loop

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
