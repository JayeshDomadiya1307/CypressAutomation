/// <reference types="cypress"/>

describe("Add items and checkout", () => {
  it("Add Items", () => {
    cy.visit(Cypress.env('URL')+"/angularpractice/");
    cy.contains("Shop").click();

    /* cy.get(".card-title").each((el, index) => {
            if (el.text().includes('Samsung Note 8')) {
                cy.get('.btn.btn-info').eq(index).click()
            }
        }) */

    cy.selectproduct("Samsung Note 8");
    cy.selectproduct("Blackberry");
    cy.contains("Checkout").click();

    var sum: number = 0;
    var amount: string = "";

    cy.get("tr td:nth-child(4) strong").each((el, index) => {
      const amount = el.text();
      cy.log(amount);

      var res = amount.split(" ");
      // res = res[1].trim()
      sum = Number(sum) + Number(res[1]);
      console.log(sum);
    });

    cy.get("td h3 strong").each((el) => {
      const amount = el.text();
      var total = amount.split(" ");

      const totalAmount = Number(total[1]);

      expect(sum).to.be.equal(totalAmount);
    });

    cy.contains('Checkout').click()
        cy.get('#country').type('India')
        cy.get('.suggestions ul li a', {timeout: 10000}).click()
        cy.get('.checkbox').click()
        cy.get('input[type="submit"]').click()
        cy.get('.alert.alert-success').should('contain.text', ' Thank you! Your order will be delivered in next few weeks')
   
  });
});
