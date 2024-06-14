class HomePage {
    getName(name: string) {
        return cy.get('[name="name"]:nth-child(2)').type(name)
    }


    getEmail(email: string) {
        return cy.get('[name="email"]').type(email)
    }
    getPassword(password: string) {
        return cy.get('#exampleInputPassword1').type(password)
    }
    getSelectCheckbox() {
        return cy.get('#exampleCheck1').check()
    }
    getGender(gender: string) {
        return cy.get('#exampleFormControlSelect1').select(gender)
    }

    getRadio1() {
        return cy.get('#inlineRadio1').check()
    }

    getSelectDisabledRadio() {
        return cy.get('#inlineRadio3')
    }
    getSubmit() {
        return cy.get('.btn')
    }

    getBinding(name: string) {
        return cy.get('[name="name"]:nth-child(1)')
    }

    getSucessMessage() {
        return cy.get('.alert')
    }
}

export default HomePage;