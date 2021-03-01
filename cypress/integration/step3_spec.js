describe('Step 3', () => {
  const host = Cypress.env('host')
  it('It should load the 2 database types', () => {
    cy.visit(`${host}/#/storage`)
    cy.get('#databaseType option').should('have.length', 2)
  })
  it('It should display a recommendation if ServerType=Validator & Database!=RocksDB', () => {
    cy.visit(`${host}`)
    cy.get('#serverType').select('validatorServer')
    cy.visit(`${host}/#/storage`)
    cy.get('#databaseType').select('nudb')
    cy.get('#recommendations_rec0001').should('exist')
  })
  it('It should not display a recommendation if ServerType=Validator & Database=RocksDB', () => {
    cy.visit(`${host}`)
    cy.get('#serverType').select('validatorServer')
    cy.visit(`${host}/#/storage`)
    cy.get('#databaseType').select('rocksdb')
    cy.get('#recommendations_rec0001').should('not.exist')
  })
  it('It should not display a recommendation if ServerType!=Validator & Database=NuDB', () => {
    cy.visit(`${host}`)
    cy.get('#serverType').select('apiServer')
    cy.visit(`${host}/#/storage`)
    cy.get('#databaseType').select('nudb')
    cy.get('#recommendations_rec0001').should('not.exist')
  })
  it('It should display a recommendation if Database=NuDB and SSD is not checked', () => {
    cy.visit(`${host}/#/storage`)
    cy.get('#databaseType').select('nudb')
    cy.get('#recommendations_rec0005').should('exist')
  })
  it('It should not display a recommendation if Database=RocksDB and SSD is not checked', () => {
    cy.visit(`${host}/#/storage`)
    cy.get('#databaseType').select('rocksdb')
    cy.get('#recommendations_rec0005').should('not.exist')
  })
})
