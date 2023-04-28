// Cypress plugins
import "@testing-library/cypress/add-commands";
import "cypress-keycloak-commands";
import "cypress-file-upload";
import "@cypress/code-coverage/support";
import 'cypress-wait-until';

// recursively gets an element, returning only after it's determined to be attached to the DOM for good
// found the snippet below here:
// https://github.com/cypress-io/cypress/issues/7306#issuecomment-850621378
Cypress.Commands.add('getSettled', (selector, opts = {}) => {
  const retries = opts.retries || 3;
  const delay = opts.delay || 100;

  const isAttached = (resolve, count = 0) => {
    const el = Cypress.$(selector);

    // is element attached to the DOM?
    count = Cypress.dom.isAttached(el) ? count + 1 : 0;

    // hit our base case, return the element
    if (count >= retries) {
      return resolve(el);
    }

    // retry after a bit of a delay
    setTimeout(() => isAttached(resolve, count), delay);
  };

  // wrap, so we can chain cypress commands off the result
  return cy.wrap(null).then(() => {
    return new Cypress.Promise((resolve) => {
      return isAttached(resolve, 0);
    }).then((el) => {
      return cy.wrap(el);
    });
  });
});

// Project specific custom commands:
Cypress.Commands.add("login", (user, redirect) => {
  const homeUrl = Cypress.env("homeUrl");
  cy.log("user >>", user);
  cy.log("redirect >>", redirect);

  if (homeUrl.includes(":5000")) {
    cy.kcFakeLogin(user, `#/login/?redirect=/${redirect}`);
    return;
  }
  cy.visit(homeUrl);
  cy.get("#username")
    .type(user)
    .get("#password")
    .type(Cypress.env("auth_password"));
  cy.get("#kc-login").click();
  cy.wait(300);
  cy.visit(`${Cypress.config("baseUrl")}/#/${redirect}`);
});

Cypress.Commands.add("checkForSessionExpired", () => {
  cy.get(".alert").should("contain", "Session expired. Please login again");
  cy.get(".close").click();
  cy.url().should("contain", "sso");
});

Cypress.Commands.add(
  "rerouteWithButton",
  { prevSubject: true },
  (selector, expectedReroute) => {
    cy.wrap(selector)
      .should("exist")
      .should("be.visible")
      .click()
      .location("hash")
      .should("be.eq", expectedReroute);
  }
);