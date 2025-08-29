// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando per attendere che l'app sia caricata
Cypress.Commands.add('waitForAppLoad', () => {
  cy.get('body').should('be.visible')
  cy.get('h1').should('contain', 'Benvenuto')
})

// Comando per verificare che siamo nella pagina di login
Cypress.Commands.add('shouldBeOnLoginPage', () => {
  cy.url().should('include', '/')
  cy.get('h1').should('contain', 'Benvenuto')
  cy.get('input[type="email"]').should('be.visible')
  cy.get('input[type="password"]').should('be.visible')
})

// Comando per verificare che siamo nella pagina di registrazione
Cypress.Commands.add('shouldBeOnSignUpPage', () => {
  cy.get('h1').should('contain', 'Registrazione')
  cy.get('input[placeholder="Nome completo"]').should('be.visible')
})

// Comando per verificare che siamo nel profilo utente
Cypress.Commands.add('shouldBeOnProfilePage', () => {
  cy.get('h1').should('contain', 'Profilo Utente')
  cy.get('input[id="email"]').should('be.visible')
})

// Comando per verificare messaggi di errore
Cypress.Commands.add('shouldShowError', (message) => {
  cy.get('.bg-red-500\\/10').should('contain', message)
})

// Comando per verificare messaggi di successo
Cypress.Commands.add('shouldShowSuccess', (message) => {
  cy.get('.bg-green-500\\/10').should('contain', message)
})

// Comando per attendere che un elemento sia visibile
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible')
})

// Comando per attendere che un elemento contenga testo
Cypress.Commands.add('waitForText', (selector, text, timeout = 10000) => {
  cy.get(selector, { timeout }).should('contain', text)
})
