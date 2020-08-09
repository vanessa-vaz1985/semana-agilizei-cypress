/// <reference types="cypress" />

context('listagem', () => {
    it('listagem sem registros', () => {
        cy.server()

        cy.route({
            method: 'GET',
            url: '**//api/1/databases/userdetails/collections/newtable?**', 
            status: 200,
            response: 'fx:webtable-get-empty'
            //fx é uma abreviação de fixture
        })
        .as('getNewtable');

        cy.visit('WebTable.html');

        cy.get('div[role="row"]').should('have.length', 1);

    });

    it('listagem com apenas um registro', () => {
        cy.server()

        cy.route({
            method: 'GET',
            url: '**//api/1/databases/userdetails/collections/newtable?**', 
            status: 200,
            response: 'fx:webtable-get-unique'
            //fx é uma abreviação de fixture
        })

        cy.visit('WebTable.html');

        //O seletor abaixo retornará uma lista de objetos
        //Como interagir com os elementos de uma lista de objetos:
        //1 --> .first()
        //2
        //3
        //4 --> .eq(3)
        //5 --> .last()
        
        cy.get('div[role="row"] div[role="gridcell"]').eq(4).find('div').as('gridCellPhone');
        cy.get('@gridCellPhone').should('contain.text', '9240321298');

    });
});