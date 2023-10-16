// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')
      })
    it('verifica o título da aplicação', function() {
  
        //cy.title().should('include', 'Central de Atendimento ao Cliente TAT')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        
        const textoLongo = 'Lorem ipsum dolor sit amet. Aut velit voluptatum et deserunt aspernatur eos tempore doloremque qui laborum unde et tempore explicabo est voluptas libero. Rem nihil voluptatem et consequatur aperiam ut porro perferendis? Ad voluptas iusto eum error distinctio aut suscipit quae qui amet quasi et dolorum quasi non magni omnis qui consequatur velit.Id obcaecati magni ut corrupti dolor est laborum rerum. Vel asperiores harum ut sint facere qui magnam accusamus cum amet nemo et pariatur itaque. Sit placeat animi est suscipit esse eum consequuntur eius est magni voluptas. Qui fugiat enim sit cumque facilis ut vero labore qui asperiores debitis!Qui consequatur fugit sit accusantium officia ab placeat perferendis et expedita laboriosam vel reprehenderit magni eos ullam natus qui magni rerum. Qui iure asperiores nam dignissimos beatae et expedita animi aut distinctio nobis est eaque ratione. Sed expedita maiores id consequuntur galisum non perspiciatis nulla. Quo consequatur quam sed quasi debitis ut incidunt provident est rerum mollitia At quod quia et quidem dolor qui omnis nulla?'

        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('gabrielralphi@gmail.com')
        cy.get('#open-text-area').type(textoLongo, {delay:0})
        //cy.get('.button').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible').contains('Mensagem enviada com sucesso.')
        
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('gabrielralphi@gmail')
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet. Aut velit voluptatum et', {delay:0})
        //cy.get('.button').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!')
    });

    it('verifica se o campo telefone não aceita texto', () => {

        cy.get('#phone')
            .type('gabriel')
            .should('have.value', '')
        
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('gabrielralphi@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet. Aut velit voluptatum et', {delay:0})
        //cy.get('.button').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

        cy.get('#firstName')
            .type('Gabriel')
            .should('have.value', 'Gabriel')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Oliveira')
            .should('have.value', 'Oliveira')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('gabrielralphi@gmail.com')
            .should('have.value', 'gabrielralphi@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('48999999999')
            .should('have.value', '48999999999')
            .clear()
            .should('have.value', '')
        
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button').click()

        cy.get('.error').should('be.visible').contains('Valide os campos obrigatórios!')
    });


    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.fillFieldsMandatory()
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')

    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.fillFieldsMandatory()
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')

    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.fillFieldsMandatory()
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')

    });


    it('marca o tipo de atendimento "Feedback"', () => {
        cy.fillFieldsMandatory()
        cy.get('input[type="radio"]')
            .check('feedback')
            .should('have.value', 'feedback')

    });

    it('marca cada tipo de atendimento', () => {
        cy.fillFieldsMandatory()

        cy.get('input[type="radio"]').each(($radio) => {
            cy.wrap($radio)
                .check()
                .should('be.checked')
          })
        
    });
    
    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.fillFieldsMandatory()

          cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')        
    });

    it('marca todos os checkboxes de uma só vez', () => {
        cy.fillFieldsMandatory()

        cy.get('input[type="checkbox"]')
                .check()
                .should('be.checked')
          
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.fillFieldsMandatory()

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json')
            .should('have.length', 1)
            .then( input => {

                expect(input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.fillFieldsMandatory()

        cy.get('input[type="file"]')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should('have.length', 1)
            .then( input => {

                expect(input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fillFieldsMandatory()

        cy.fixture('example.json').as('example')
        cy.get('input[type=file]')
            .selectFile('@example')
            .should('have.length', 1)
            .then( input => {

                expect(input[0].files[0].name).to.equal('example.json')
            })
    });


    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')

    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.title()
            .should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
        cy.contains('Talking About Testing').should('be.visible')

    });


    

  })