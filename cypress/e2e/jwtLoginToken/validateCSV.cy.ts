import neatCsv from "neat-csv";
/// <reference types="cypress"/>

describe("JWT Session Token Test", () => {
  const neatCSV = require("neat-csv");

  var productName: any;

  it("Is logged in through local storage", () => {
    cy.LoginAPI().then(() => {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: (window) => {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });

    cy.get(".card-body b")
      .eq(1)
      .each((el) => {
        productName = el.text();
      });
    cy.get(".card-body button:last-of-type").eq(1).click();
    cy.get('[routerlink="/dashboard/cart"]').click();
    cy.contains("Checkout").click();
    cy.get(".form-group > .input").should("be.visible").type("Ind");

    cy.get(".ta-results button").each((el) => {
      const actualText = el.text();
      if (actualText.trim() === "India") {
        cy.wrap(el).click();
      }
    });

    cy.get(".action__submit").click();
    cy.get(".hero-primary").should("contain.text", "Thankyou for the order.");

    cy.wait(2000);

    cy.contains("Click To Download Order Details in CSV").click();

    const filePath =
      Cypress.config("fileServerFolder") +
      "/cypress/downloads/order-invoice_jayeshdomadiya07.csv";

    cy.readFile(filePath).then((text: any) => {
      const csv = neatCSV(text);
      console.log(csv);

      const actualCSVProductName = csv.promise.PromiseResult[0]["Product Name"];
      expect(productName).to.be.equal(actualCSVProductName);

      /* below code is another way to read CSV which will only show that the text is present in the excel 
    (not a certain position as above) */

      cy.readFile(filePath).then((text: any) => {
        expect(text).to.include(productName);
      });
    });
  });
});
