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
  env: {
    codeCoverage: {
        exclude: "cypress/**/*.*",
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    }
  },

  // component: {
  //   setupNodeEvents(on, config) {},
  //   specPattern: "src/code/**/*.test.{js,ts,jsx,tsx}",
  // },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      return config;
  },
  },
});
