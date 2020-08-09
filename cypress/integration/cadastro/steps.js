// implementação dos passos descritos nas features

/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

When(/^informar meus dados$/, () => {
	    //type
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^=Last]').type(chance.last());
        cy.get('input[ng-model^=Email]').type(chance.email());
        cy.get('input[ng-model*=Phone]').type(chance.phone({ formatted: false }));

        //check --> radio ou checkbox
        cy.get('input[value="FeMale"]').check();
        cy.get('input[type="checkbox"]').check('Cricket');
        cy.get('input[type="checkbox"]').check('Hockey');

        //select --> select e select2 (combos)
        cy.get('#Skills').select('Javascript');
        cy.get('#countries').select('Argentina');
        cy.get('select#country').select('Australia', {force: true});
        cy.get('select#yearbox').select('1996');
        cy.get('select[ng-model^="month"]').select('February');
        cy.get('select[ng-model^="day"]').select('6');

        cy.get('input#firstpassword').type('Agilizei2020');
        cy.get('input#secondpassword').type('Agilizei2020');

        //attachFile --> input file
        cy.get('input#imagesrc').attachFile('imagem-foto.png');

});

When(/^salvar$/, () => {
        //click
        cy.get('button#submitbtn').click();
	
});

Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@postNewtable').then((resNewtable) => {
        //chai
        expect(resNewtable.status).to.eql(200)
    });

    cy.wait('@postUsertable').then((resUsertable) => {
        //chai
        expect(resUsertable.status).to.eql(200)
    });

    cy.wait('@getNewtable').then((resNewtable) => {
        //chai
        expect(resNewtable.status).to.eql(200)
    });

    cy.url().should('contain', 'WebTable');

});
