/// <reference types="cypress" />

import { siteURL } from '../../src/constants'
import { login, password } from '../../src/constants'

describe('home-page', () => {
  before(() => {
    cy.then(() => {
      window.localStorage.setItem('username', login)
      window.localStorage.setItem('password', password)
    })
  })

  beforeEach(() => {
    cy.visit('http://' + siteURL + 'customizer')
  })

  it('renders content', () => {
    cy.get('header').should('exist')

    cy.get('main').should('exist')
    cy.get('[data-testid="customizer-header"]').contains('Customizer')
    cy.get('[data-testid="customizer-label"]').contains('You can customise a look of the application here')
    
    cy.get('[data-testid="theme-label"]').contains('Select theme')
    cy.get('[data-testid="theme-select"]').should('exist')
    cy.get('[data-testid="font-label"]').contains('Select font-size')
    cy.get('[data-testid="font-select"]').should('exist')

    cy.get('footer').should('exist').contains('© 2018-2022 Debricked AB | Use open source securely')
  })
})