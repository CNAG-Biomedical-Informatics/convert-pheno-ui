import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "convertPheno",
  experimentalStudio: true,

  retries: {
    runMode: 2,
    openMode: 0,
  },

  chromeWebSecurity: false,
  trashAssetsBeforeRuns: true,
  fixturesFolder: "cypress/fixtures",
  downloadsFolder: "cypress/downloads",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  reporter: "cypress-multi-reporters",

  reporterOptions: {
    reporterEnabled: "mochawesome,mocha-junit-reporter",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mocha",
      overwrite: false,
      html: false,
      json: true,
      quiet: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress/reports/junit/junit.[hash].xml",
      jenkinsMode: true,
    },
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },

  component: {
    setupNodeEvents(on, config) {},
    specPattern: "src/code/**/*.test.{js,ts,jsx,tsx}",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
