const userInfo = {
    firstName: 'Bob',
    address: '123 North Street',
    occupation: 'SELF_EMPLOYED',
    hasChildren: 'NO',
    email: 'bob@email.com',
}

describe('The Questionnaire Page', function() {
    it('redirects from /recommendation to / when there is no jwt', function() {
        // Assure jwt not saved in localStorage
        cy.clearLocalStorage()
        cy.visit('/recommendation')
        // If we don't have a jwt we should be routed to /questionnaire
        cy.url().should('not.include', '/recommendation')
    })
    it('reroutes to /recommendation upon questionnaire submission', function() {
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
