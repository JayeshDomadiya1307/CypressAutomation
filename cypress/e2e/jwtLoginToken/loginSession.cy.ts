/// <reference types="cypress"/>

describe("JWT Session Token Test", () => {
  it("Is logged in through local storage", () => {
    cy.LoginAPI().then(() => {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: (window) => {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });

    cy.get('.card-body button:last-of-type').eq(1).click()
    cy.get('[routerlink="/dashboard/cart"]').click()
    cy.contains('Checkout').click()
    cy.get('.form-group > .input').should('be.visible').type('Ind')

    cy.get('.ta-results button').each((el) => {
        
        const actualText = el.text()
        if(actualText.trim() === "India") {
            cy.wrap(el).click()
        }
    })

    cy.get('.action__submit').click()
    cy.get('.hero-primary').should('contain.text', 'Thankyou for the order.')

    cy.wait(2000)

    cy.contains('Click To Download Order Details in CSV').click()

  });
});
