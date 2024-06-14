/// <reference types="cypress"/>

describe("Request POST API", () => {
  it("Using cy.request method", () => {
    cy.request("POST", "http://216.10.245.166", {
      name: "Learn Appium Automation with Java",
      isbn: "bcd",
      aisle: "227",
      author: "John foe",
    }).then((response) => {
        // expect(response.body).to.have.property('Msg', 'successfully added')
        expect(response.status).to.eq(200)
    })
  });
});
