// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    const TRES_SEGUNDOS = 3000

    beforeEach(() => {
        cy.visit('./src/index.html')
      })
    it('verifica o título da aplicação', function() {
  
        //cy.title().should('include', 'Central de Atendimento ao Cliente TAT')
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário com mensagem grande', () => {
        
        const textoLongo = Cypress._.repeat('Lorem ipsum dolor sit amet', 24)
        cy.clock()
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('gabrielralphi@gmail.com')
        cy.get('#open-text-area')
            .invoke('val', textoLongo)
            .should('have.value', textoLongo)
        
        
        cy.contains('button', 'Enviar').click()
        
        cy.get('.success')
            .should('be.visible')
            .contains('Mensagem enviada com sucesso.')
        cy.tick(TRES_SEGUNDOS)
        cy.get('.success')
            .should('not.be.visible')

            
        
    });

    Cypress._.times(5, () => {
    it('preenche os campos obrigatórios e envia o formulário', () => {
        
        const textoLongo = Cypress._.repeat('Lorem ipsum dolor sit amet', 24)
    
        cy.clock()
        cy.fillFieldsUser();
        cy.get('#open-text-area')
            .invoke('val', textoLongo)
            .should('have.value', textoLongo)
        
        
        cy.contains('button', 'Enviar').click()
        
        cy.get('.success')
            .should('be.visible')
            .contains('Mensagem enviada com sucesso.')
        cy.tick(TRES_SEGUNDOS)
        cy.get('.success')
            .should('not.be.visible')

    })
    })


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('gabrielralphi@gmail')
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet. Aut velit voluptatum et', {delay:0})
        //cy.get('.button').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error')
            .should('be.visible')
            .contains('Valide os campos obrigatórios!')
        cy.tick(TRES_SEGUNDOS)
        cy.get('.error')
            .should('not.be.visible')


    });

    it('verifica se o campo telefone não aceita texto', () => {

        cy.get('#phone')
            .type('gabriel')
            .should('have.value', '')
        
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        cy.get('#firstName').type('Gabriel')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('gabrielralphi@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Lorem ipsum dolor sit amet. Aut velit voluptatum et', {delay:0})
        //cy.get('.button').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error')
            .should('be.visible')
            .contains('Valide os campos obrigatórios!')
        cy.tick(TRES_SEGUNDOS)
        cy.get('.error')
                .should('not.be.visible')
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
        cy.clock()
        cy.get('.button').click()

        cy.get('.error')
            .should('be.visible')
            .contains('Valide os campos obrigatórios!')
        cy.tick(TRES_SEGUNDOS)
        cy.get('.error')
            .should('not.be.visible')
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

    it('exibe e esconde as mensagens de sucesso e erro usando o invoke', () => {
  
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')

    });
    
    it('preenche a area de texto usando o comando invoke', () => {
        const textoLongo = Cypress._.repeat('Lorem ipsum dolor sit amet', 24)
        cy.get('#open-text-area')
            .invoke('val', textoLongo)
            .should('have.value', textoLongo)

    });
    
    it('faz uma requisição HTTP', () => {
        cy.request({
            method: 'GET',
            url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.statusText).to.equal('OK');
            expect(response.body).to.include('CAC TAT')
          })

    });



  })