// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillFieldsMandatory', function() {

    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('gabrielralphi@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet. Aut velit voluptatum et deserunt aspernatur eos tempore', {delay:0})
    
    
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

    cy.get('#firstName').type('Gabriel')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('gabrielralphi@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet. Aut velit voluptatum et deserunt aspernatur eos tempore', {delay:0})
    //cy.get('.button').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.')
})

Cypress.Commands.add('politicaPrivacidade', function() {

    cy.get('#white-background')
        .should('have.text', '\n      Não salvamos dados submetidos no formulário da aplicação CAC TAT.\n      Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.\n      No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.\n      \n      Talking About Testing\n    ')

})
