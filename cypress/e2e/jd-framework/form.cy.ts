import user from '@fixtures/example.json'
import HomePage from '../pageObjects/homePage';

describe('Fill the Form and Submit', () => {

    beforeEach(function() {
        cy.fixture('example').then(function(data: any) {
            this.data = data;
        })
    })

    it('Fill the form', () => {

        const homepage = new HomePage();
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
        homepage.getName(user.name)
        homepage.getEmail(user.email)
        homepage.getPassword(user.password)
        homepage.getSelectCheckbox().should('be.checked')
        homepage.getGender(user.gender).should('have.value', 'Male')
        homepage.getRadio1().should('be.checked')
        homepage.getSelectDisabledRadio().should('be.disabled')
        homepage.getBinding(user.name).should('have.value', user.name)
        homepage.getSubmit().click()
        homepage.getSucessMessage().should('contain.text', 'Success!')
    });
});