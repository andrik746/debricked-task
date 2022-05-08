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
    cy.visit('http://' + siteURL)
  })

  it('renders content', () => {
    cy.get('header').should('exist')

    cy.get('main').should('exist')
    cy.get('[data-testid="scanner-header"]').contains('Scanner')
    cy.get('[data-testid="scanner-label"]').contains('Upload your dependency file to scan for vulnerabilities')
    cy.get('[data-testid="upload-button"]').contains('Select File')

    cy.get('footer').should('exist').contains('© 2018-2022 Debricked AB | Use open source securely')
  })
})
