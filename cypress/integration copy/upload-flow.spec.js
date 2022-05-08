/// <reference types="cypress" />

import { siteURL } from '../../src/constants'

describe('upload-flow', () => {
  
  beforeEach(() => {
    cy.visit('http://' + siteURL)
  })

  it('renders one table row with result', () => {
    cy.get('[data-testid="scanner-uploader"] input[type=file]').should('exist').attachFile('yarn.lock')
    cy.get('[data-testid="scanner-progress"]').should('exist')
    cy.get('[data-testid="results-table"] tbody tr').should('exist')
  })
})
