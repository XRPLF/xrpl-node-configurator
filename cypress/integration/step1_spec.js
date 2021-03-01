describe('Step 1', () => {
  const host = Cypress.env('host')
  it('Peer port cannot be empty', () => {
    cy.visit(host)
    cy.get('#peerPort').clear()
    cy.get('#generateBtn').should('be.disabled')
  })
  it('Peer and wsPublic ports cannot be the same', () => {
    cy.visit(host)
    cy.get('#peerPort').type(9999)
    cy.get('#protocolSupportedWsPublic').check()
    cy.get('#wsPublicPort').type(9999)
    cy.get('#generateBtn').should('be.disabled')
  })
  it('Running as validator should disable Websockets Public', () => {
    cy.visit(host)
    cy.get('#serverType').select('validatorServer')
    cy.should('not.contain', '#wsPublicPort')
    cy.should('not.contain', '#wsPublicIp')
    cy.should('not.contain', '#wsPublicSecure')
  })
  it('It should load the 6 server modes', () => {
    cy.visit(host)
    cy.get('#serverType option').should('have.length', 6)
  })
  it('WebSockets Admin: it should display ip, port, secure and admin if checked', () => {
    cy.visit(host)
    cy.get('#protocolSupportedWsAdmin').check()
    cy.get('#wsAdminPort').should('exist')
    cy.get('#wsAdminIp').should('exist')
    cy.get('#wsAdminSecure').should('exist')
    cy.get('#wsAdminAdmin').should('exist')
  })
  it('WebSockets Admin: it should not display ip, port, secure and admin if not checked', () => {
    cy.visit(host)
    cy.get('#protocolSupportedWsAdmin').uncheck()
    cy.get('#wsAdminPort').should('not.exist')
    cy.get('#wsAdminIp').should('not.exist')
    cy.get('#wsAdminSecure').should('not.exist')
    cy.get('#wsAdminAdmin').should('not.exist')
  })
  it('JSON-RPC: it should display ip, port, secure and admin if checked', () => {
    cy.visit(host)
    cy.get('#protocolSupportedJsonRpc').check()
    cy.get('#rpcPort').should('exist')
    cy.get('#rpcIp').should('exist')
    cy.get('#rpcSecure').should('exist')
    cy.get('#rpcAdmin').should('exist')
  })
  it('JSON-RPC: it should not display ip, port, secure and admin if not checked', () => {
    cy.visit(host)
    cy.get('#protocolSupportedJsonRpc').uncheck()
    cy.get('#rpcPort').should('not.exist')
    cy.get('#rpcIp').should('not.exist')
    cy.get('#rpcSecure').should('not.exist')
    cy.get('#rpcAdmin').should('not.exist')
  })
  it('gRPC: it should display ip, port if checked', () => {
    cy.visit(host)
    cy.get('#protocolSupportedGrpc').check()
    cy.get('#grpcPort').should('exist')
    cy.get('#grpcIp').should('exist')
  })
  it('gRPC: it not should display ip, port if not checked', () => {
    cy.visit(host)
    cy.get('#protocolSupportedGrpc').uncheck({ force: true })
    cy.get('#grpcPort').should('not.exist')
    cy.get('#grpcIp').should('not.exist')
  })
})
