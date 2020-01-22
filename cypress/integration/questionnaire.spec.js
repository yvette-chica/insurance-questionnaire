const userInfo = {
    firstName: 'Bob',
    address: '123 North Street',
    occupation: 'SELF_EMPLOYED',
    hasChildren: 'NO',
    email: 'bob@email.com',
}

describe('The Questionnaire Page', function() {
    it('redirects from / to /questionnaire when there is no jwt', function() {
        // Assure jwt not saved in localStorage
        cy.clearLocalStorage()
        cy.visit('/')
        // If we don't have a jwt we should be routed to /questionnaire
        cy.url().should('include', '/questionnaire')
    })
    it('reroutes to /recommendation upon submission', function() {
        cy.visit('/')
        // Enter first name
        cy.get('input.ant-input').type(`${userInfo.firstName}{enter}`)

        // Enter address
        cy.get('input.ant-input').type(`${userInfo.address}{enter}`)

        // Select occupation
        cy.get(`input[value=${userInfo.occupation}]`).click()
        cy.get('button.ant-btn.next').click()

        // Select whether the user has children
        cy.get(`input[value=${userInfo.hasChildren}]`).click()
        cy.get('button.ant-btn.next').click()

        // Enter email
        cy.get('input.ant-input').type(userInfo.email)

        // Submit user info
        cy.get('button.ant-btn.submit').click()

        cy.url().should('include', '/recommendation')
    })
})
