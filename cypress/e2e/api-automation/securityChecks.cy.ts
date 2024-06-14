/// <reference  types="cypress"/>

describe("API Testing Automation", () => {
    it("Modify Response", () => {
  
      cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
      
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=jayeshdomadiya',
            
            req.continue((response) => {
                expect(response.statusCode).to.be.eq(404)
            })
        }).as('dummyRequest')

        cy.get('.btn.btn-primary').click()
        cy.wait('@dummyRequest')
  
    });
  });
  