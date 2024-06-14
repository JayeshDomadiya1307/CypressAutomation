import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import user from "@fixtures/example.json";
import HomePage from "../../pageObjects/homePage";
import { data } from "cypress/types/jquery";

const homepage = new HomePage();
let name;

Given("I open eCommerce page", () => {
  cy.visit(Cypress.env("URL") + "/angularpractice/");
});

When("I add the products into cart", () => {
  cy.contains("Shop").click();
  cy.selectproduct("Samsung Note 8");
  cy.selectproduct("Blackberry");
});

When("I select the conuntry and validate the price", () => {
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

  cy.contains("Checkout").click();
  cy.get("#country").type("India");
  cy.get(".suggestions > ul > li > a").click({ force: true });
  cy.get(".checkbox").click();
});

Then("Submit and validate success message", () => {
  cy.get('input[type="submit"]').click();
  cy.get(".alert.alert-success").should(
    "contain.text",
    " Thank you! Your order will be delivered in next few weeks"
  );
});

Given("I open eCommerce page", () => {
  cy.visit("https://rahulshettyacademy.com/angularpractice/");
});

When("I fill the form details", (dataTable: any) => {

  name = dataTable.rawTable[1][0]
  homepage.getName(name);
  homepage.getEmail(dataTable.rawTable[1][1]);
  homepage.getPassword(user.password);
  homepage.getSelectCheckbox().should("be.checked");
  homepage.getGender(user.gender).should("have.value", "Male");
  homepage.getRadio1().should("be.checked");
  homepage.getSelectDisabledRadio().should("be.disabled");
  homepage.getBinding(name).should("have.value", name);
});

When("validate the form behaviour", () => {
  homepage.getSubmit().click();
  homepage.getSucessMessage().should("contain.text", "Success!");
});

Then("I click on Shop", () => {
  cy.contains("Shop").click();
});
