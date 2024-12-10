describe('Functional Tests for \'Edit Playlist\' route', () => {
    beforeEach( () => {
        cy.visit("http://localhost:8080/docs/");
        // click the "edit playlist" route button
        cy.get('#operations-playlist-editPlaylist').click();
    })

    it('Check if the button opens correctly', () => {
        cy.get('#operations-playlist-editPlaylist').should('have.class','is-open');
        
        // check some of the phrases that should exist
        const expected = ['Parameters','Request body','Responses','FR-12 A logged in user must be able to edit his playlist'];
        expected.forEach((text) => {
            cy.get('#operations-playlist-editPlaylist > div').last().contains(text);
        });

        cy.url().should('include','playlist/editPlaylist');
    })

    describe('Check the "Try it out" button', () => {
        beforeEach( () => {
            // click the "Try it out" button
            cy.get('#operations-playlist-editPlaylist .try-out').click();
        })

        it('Check if the "Try it out" button opens correctly', () => {
            cy.get('#operations-playlist-editPlaylist .try-out__btn')
            .should('have.text','Cancel')
            .should('have.class','cancel');

            cy.get('#operations-playlist-editPlaylist').contains('Execute');
            cy.get('#operations-playlist-editPlaylist .execute-wrapper')
            .should('have.length.above',0)
            .should('have.descendants','button');

            // check that the input fields are not disabled
            cy.get('input[placeholder="userId - ID of the playlistAuthor"]').should('not.have.attr','disabled');
            cy.get('input[placeholder="playlistId - ID of the playlist to edit"]').should('not.have.attr','disabled');
        })

        it('Try to "Execute"', () => {
            cy.get('#operations-playlist-editPlaylist').within( () => {
                
                // type correct type values in the input fields 
                cy.get('input[placeholder="userId - ID of the playlistAuthor"]').type('1234');
                cy.get('input[placeholder="playlistId - ID of the playlist to edit"]').type('9876');

                // click "Execute" 
                cy.get('button.execute').click();

                // check some of the things that should exist
                cy.contains('http://localhost:8080/user/1234/playlist/9876');
                cy.get('.btn-clear').should('exist');
                cy.get('.responses-inner').contains('Response headers');
                cy.get('.responses-inner').children().should('have.length',2);
            })
        })

        it('Try to "Execute" with empty fields', () => {
            cy.get('#operations-playlist-editPlaylist').within( () => {
                // click "Execute" 
                cy.get('button.execute').click();

                // check that it throws error
                cy.get('input[placeholder="userId - ID of the playlistAuthor"]')
                .should('have.class','invalid')
                .should('have.attr','title','Required field is not provided')
                .should('have.css','border-color','rgb(249, 62, 62)'); // a shade of red

                cy.get('input[placeholder="playlistId - ID of the playlist to edit"]')
                .should('have.class','invalid')
                .should('have.attr','title','Required field is not provided')
                .should('have.css','border-color','rgb(249, 62, 62)'); // a shade of red

                // check that it didn't display any new Responses
                cy.get('.responses-inner').children()
                .should('have.length',1)
                .should('match','table');
            })
        })

        it('Try to "Execute" with incorrect type values', () => {
            // type incorrect type values in the input fields 
            cy.get('input[placeholder="userId - ID of the playlistAuthor"]').type('myUser');
            cy.get('input[placeholder="playlistId - ID of the playlist to edit"]').type('bestPlaylist');

            // click "Execute" 
            cy.get('button.execute').click();

            // check that it throws error
            cy.get('input[placeholder="userId - ID of the playlistAuthor"]')
            .should('have.class','invalid')
            .should('have.attr','title','Value must be an integer')
            .should('have.css','border-color','rgb(249, 62, 62)'); // a shade of red

            cy.get('input[placeholder="playlistId - ID of the playlist to edit"]')
            .should('have.class','invalid')
            .should('have.attr','title','Value must be an integer')
            .should('have.css','border-color','rgb(249, 62, 62)'); // a shade of red

            // check that it didn't display any new Responses
            cy.get('#operations-playlist-editPlaylist .responses-inner').children()
            .should('have.length',1)
            .should('match','table');
        })

        it('Check the "Clear" button', () => {
            cy.get('#operations-playlist-editPlaylist').within( () => {
                // type correct type values in the input fields 
                cy.get('input[placeholder="userId - ID of the playlistAuthor"]').type('1234');
                cy.get('input[placeholder="playlistId - ID of the playlist to edit"]').type('9876');

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
            cy.get('#operations-playlist-editPlaylist').within( () => {
                // click "Cancel"
                cy.get('.try-out__btn').click();

                // check that it works correctly 
                cy.get('.try-out__btn').should('have.text','Try it out ');
                cy.get('.execute-wrapper').should('not.have.descendants');
                cy.get('.btn-group').should('not.exist');

                // check that the input fields are disabled
                cy.get('input[placeholder="userId - ID of the playlistAuthor"]').should('have.attr','disabled');
                cy.get('input[placeholder="playlistId - ID of the playlist to edit"]').should('have.attr','disabled');
            })
        })

    })
})