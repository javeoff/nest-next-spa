describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    cy.findByRole('link', {name: /To Page/i})
      .click()

    cy.findByRole('link', {name: /To Index/i})
      .should('exist')

  })
})
