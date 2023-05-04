/**
  Cypress test for the home page of the Convert-Pheno UI.

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

describe("Home elements visible", () => {
  before(() => {
    // cy.kcFakeLogin(Cypress.env("auth_user1"), "#/login/?redirect=/home");
    cy.visit("/home")
  })

  it("Welcome message", () => {
    cy.findByText("Welcome to Convert-Pheno").should("be.visible");
  });
});
