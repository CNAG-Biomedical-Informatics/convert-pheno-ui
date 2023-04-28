/** 
  Storybook file for Home component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React from "react";
import { withRouter } from "storybook-addon-react-router-v6";

import Home from "./Home";

export default {
  title: "Home",
  component: Home,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: "/users/:userId",
      routeParams: { userId: "42" },
    },
  },
};

const Template = () => {
  return <Home />;
};
export const Default = Template.bind({});
