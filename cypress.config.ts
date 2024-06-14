import { defineConfig } from "cypress";
import { toPath } from "cypress/types/lodash";
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

export default defineConfig({
  env: {
    URL: "https://rahulshettyacademy.com/",
  },
  retries: {
    openMode: 2,
    runMode: 2,
  },
  video: true,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    toPath: "../RS_Project/cypress/reports/htmlreports",
  },

  defaultCommandTimeout: 6000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);

      on("task", {
        excelToJsonConvertor(filePath) {
          const result = excelToJson({
            source: fs.readFileSync(filePath), // fs.readFileSync return a Buffer
          });
          return result;
        },
      });
    },

    specPattern: ["../RS_Project/cypress/e2e/**/*"],
  },
});
