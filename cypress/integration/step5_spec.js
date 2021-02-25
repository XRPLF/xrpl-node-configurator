describe('Step 5', () => {
  const host = Cypress.env('host')
  it('It should load the 5 log level types', () => {
    cy.visit(`${host}/#/settings`)
    cy.get('#logLevel option').should('have.length', 5)
  })
  it('It should display a recommendation if ServerType=Validator & Broadcast Address=true', () => {
    cy.visit(`${host}`)
    cy.get('#serverType').select('validatorServer')
    cy.visit(`${host}/#/settings`)
    cy.get('#peerPrivate').check()
    cy.get('#recommendations_rec0004').should('exist')
  })
  it('It should not display a recommendation if ServerType!=Validator & Broadcast Address=true', () => {
    cy.visit(`${host}`)
    cy.get('#serverType').select('apiServer')
    cy.visit(`${host}/#/settings`)
    cy.get('#peerPrivate').check()
    cy.get('#recommendations_rec0004').should('not.exist')
  })
})
