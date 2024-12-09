describe('Functional Tests for \'Get User\' route', () => {
    beforeEach( () => {
        cy.visit("http://localhost:8080/docs/");
        // click the "get user" route button
        cy.get('#operations-user-getUser').click();
    })

    it('Check if the button opens correctly', () => {
        cy.get('#operations-user-getUser').should('have.class','is-open');
        
        // check some of the phrases that should exist
        const expected = ['Parameters','Responses','US-8 Notification','Successful, User details'];
        expected.forEach((text) => {
            cy.get('#operations-user-getUser > div').last().contains(text);
        });

        cy.url().should('include','user/getUser');
    })

    describe('Check the "Try it out" button', () => {
        beforeEach( () => {
            // click the "Try it out" button
            cy.get('#operations-user-getUser .try-out').click();
        })

        it('Check if the "Try it out" button opens correctly', () => {
            cy.get('#operations-user-getUser .try-out__btn')
            .should('have.text','Cancel')
            .should('have.class','cancel');

            cy.get('#operations-user-getUser').contains('Execute');
            cy.get('#operations-user-getUser .execute-wrapper')
            .should('have.length.above',0)
            .should('have.descendants','button');

            // check that the input fields is not disabled
            cy.get('input[placeholder="userId - ID of the user"]').should('not.have.attr','disabled');
        })

        it('Try to "Execute"', () => {
            cy.get('#operations-user-getUser').within( () => {
                
                // type correct type value in the input field 
                cy.get('input[placeholder="userId - ID of the user"]').type('555');

                // click "Execute" 
                cy.get('button.execute').click();

                // check some of the things that should exist
                cy.contains('curl -X GET "http://localhost:8080/user/555" -H "accept: application/json"');
                cy.get('.btn-clear').should('exist');
                cy.get('.responses-inner').contains('Response headers');
                cy.get('.responses-inner').children().should('have.length',2);
            })
        })

        it('Try to "Execute" with empty field', () => {
            cy.get('#operations-user-getUser').within( () => {
                // click "Execute" 
                cy.get('button.execute').click();

                // check that it throws error
                cy.get('input[placeholder="userId - ID of the user"]')
                .should('have.class','invalid')
                .should('have.attr','title','Required field is not provided')
                .should('have.css','border-color','rgb(249, 62, 62)'); // a shade of red

                // check that it didn't display any new Responses
                cy.get('.responses-inner').children()
                .should('have.length',1)
                .should('match','table');
            })
        })

        it('Try to "Execute" with incorrect type value', () => {
            // type incorrect type value in the input field
            cy.get('input[placeholder="userId - ID of the user"]').type('myUser');

            // click "Execute" 
            cy.get('#operations-user-getUser button.execute').click();

            // check that it throws error
            cy.get('input[placeholder="userId - ID of the user"]')
            .should('have.class','invalid')
            .should('have.attr','title','Value must be an integer')
            .should('have.css','border-color','rgb(249, 62, 62)'); // a shade of red

            // check that it didn't display any new Responses
            cy.get('#operations-user-getUser .responses-inner').children()
            .should('have.length',1)
            .should('match','table');
        })

        it('Check the "Clear" button', () => {
            cy.get('#operations-user-getUser').within( () => {
                // type correct type value in the input field
                cy.get('input[placeholder="userId - ID of the user"]').type('555');

                // click "Execute" 
                cy.get('button.execute').click();

                // click "Clear"
                cy.get('.btn-clear').click();

                // check that it works correctly 
                cy.get('.btn-clear').should('not.exist');
                cy.get('.execute-wrapper').children().should('have.length',1);

                cy.get('.responses-inner')
                .should('not.include.text','Curl')
                .children()
                .should('have.length',1)
                .should('match','table');
            })
        })

        it('Check the "Cancel" button', () => {
            cy.get('#operations-user-getUser').within( () => {
                // click "Cancel"
                cy.get('.try-out__btn').click();

                // check that it works correctly 
                cy.get('.try-out__btn').should('have.text','Try it out ');
                cy.get('.execute-wrapper').should('not.have.descendants');
                cy.get('.btn-group').should('not.exist');

                // check that the input field is disabled
                cy.get('input[placeholder="userId - ID of the user"]').should('have.attr','disabled');
            })
        })

    })
})