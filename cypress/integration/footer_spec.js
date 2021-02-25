describe('Footer', () => {
  const host = Cypress.env('host')
  it('It should change the JSON config when signing support is checked', () => {
    cy.visit(`${host}/#/settings`)
    cy.get('#signingSupport').check()
    cy.get('#exploreBtn').click()
    cy.get('#jsonCfg_textarea').invoke('val').then(value => {
      const json = JSON.parse(value)
      return json.settings.signing.support === true
    })
  })
  it('It should change the JSON config when signing support is unchecked', () => {
    cy.visit(`${host}/#/settings`)
    cy.get('#signingSupport').check()
    cy.get('#exploreBtn').click()
    cy.get('#jsonCfg_textarea').invoke('val').then(value => {
      const json = JSON.parse(value)
      return json.settings.signing.support === false
    })
  })
  it('It should change the JSON config when broadcast address is checked', () => {
    cy.visit(`${host}/#/settings`)
    cy.get('#peerPrivate').check()
    cy.get('#exploreBtn').click()
    cy.get('#jsonCfg_textarea').invoke('val').then(value => {
      const json = JSON.parse(value)
      return json.settings.peer.private === true
    })
  })
  it('It should change the JSON config when broadcast address is unchecked', () => {
    cy.visit(`${host}/#/settings`)
    cy.get('#peerPrivate').check()
    cy.get('#exploreBtn').click()
    cy.get('#jsonCfg_textarea').invoke('val').then(value => {
      const json = JSON.parse(value)
      return json.settings.peer.private === false
    })
  })
})
