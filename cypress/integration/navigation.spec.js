/// <reference types="cypress" />

import { siteURL } from '../../src/constants'

describe('navigation', () => {
  beforeEach(() => {
    cy.visit('http://' + siteURL)
  })

  it('works fine', () => {
    cy.get('[data-testid="nav-link-customizer"]').contains('Customizer').click()
    cy.url().should('include', '/customizer')
    cy.get('[data-testid="customizer-header"]').contains('Customizer')

    cy.get('[data-testid="nav-link-scanner"]').contains('Scanner').click()
    cy.url().should('not.include', '/customizer')
    cy.get('[data-testid="scanner-header"]').contains('Scanner')
  })
})
