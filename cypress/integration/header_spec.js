
const version = require('../../lib/version')

describe('Header', () => {
  const host = Cypress.env('host')
  it('Version should match with lib/version.js', () => {
    cy.visit(host)
    cy.get('#appVersion').invoke('text').then(value => {
      const v = value.replace('\n', '').trim()
      return v === version
    })
  })
})
