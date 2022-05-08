/// <reference types="cypress" />

import { siteURL } from '../../src/constants'

describe('upload-flow', () => {
  
  beforeEach(() => {
    cy.visit('http://' + siteURL + 'customizer')
  })

  it('works fine with theme changes', () => {
    cy.get('[data-testid="theme-select"]').should('exist').click()
    cy.get('.ant-select-item-option-content').contains('Dark').click()
    cy.get("html").should("have.attr", "theme", "dark")

    cy.get('[data-testid="theme-select"]').click()
    cy.get('.ant-select-item-option-content').contains('Light').click()
    cy.get("html").should("have.attr", "theme", "light")
  })

  it('works fine with font changes', () => {
    cy.get('[data-testid="font-select"]').should('exist').click()
    cy.get('.ant-select-item-option-content').contains('Small').click()
    cy.get("html").should("have.attr", "font", "small")

    cy.get('[data-testid="font-select"]').click()
    cy.get('.ant-select-item-option-content').contains('Medium').click()
    cy.get("html").should("have.attr", "font", "medium")

    cy.get('[data-testid="font-select"]').click()
    cy.get('.ant-select-item-option-content').contains('Large').click()
    cy.get("html").should("have.attr", "font", "large")

    cy.get('[data-testid="font-select"]').click()
    cy.get('.ant-select-item-option-content').contains('Extra Large').click()
    cy.get("html").should("have.attr", "font", "extra-large")
  })
})
