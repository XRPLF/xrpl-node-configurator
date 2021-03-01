describe('Step 4', () => {
  const host = Cypress.env('host')
  it('It should display file and dir inputs if client verifications are checked', () => {
    cy.visit(`${host}/#/ssl`)
    cy.get('#sslClientVerify').check()
    cy.get('#sslVerifyDir').should('exist')
    cy.get('#sslVerifyFile').should('exist')
  })
  it('It should not display file and dir inputs if client verifications are not checked', () => {
    cy.visit(`${host}/#/ssl`)
    cy.get('#sslClientVerify').uncheck()
    cy.get('#sslVerifyDir').should('not.exist')
    cy.get('#sslVerifyFile').should('not.exist')
  })
  it('It should display certificate and key inputs if server tls is checked', () => {
    cy.visit(`${host}/#/ssl`)
    cy.get('#sslServer').check()
    cy.get('#sslServerCert').should('exist')
    cy.get('#sslServerKey').should('exist')
  })
  it('It should not display certificate and key inputs if server tls is not checked', () => {
    cy.visit(`${host}/#/ssl`)
    cy.get('#sslServer').uncheck()
    cy.get('#sslServerCert').should('not.exist')
    cy.get('#sslServerKey').should('not.exist')
  })
})
