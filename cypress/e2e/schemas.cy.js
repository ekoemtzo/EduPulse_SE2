describe('Functional Tests for the \'Schemas\' buttons', () => {
    beforeEach( () => {
        cy.visit("http://localhost:8080/docs/");
    })

    it('Check if the \'New Post\' schema button opens correctly', () => {
        // rename the element for quicker future use
        cy.get('.models #model-NewPost').as('newPost');

        // open the "New Post" schema
        cy.get('@newPost').find('[style="cursor: pointer;"]').first().click();

        // check that the right changes have been made
        cy.get('@newPost').find('.model-box').children().should('match','div');
        cy.get('@newPost').should('contain','file')
                          .should('contain','details')
                          .should('contain','postAuthorId')
                          .should('contain','NewPost_details');
    })

    it('Check if the \'New Post\' schema button closes correctly', () => {
        // rename the element for quicker future use
        cy.get('.models #model-NewPost').as('newPost');

        // open the "New Post" schema
        cy.get('@newPost').find('[style="cursor: pointer;"]').first().click();

        // close the "New Post" schema
        cy.get('@newPost').find('[style="cursor: pointer;"]').first().click();

        // check that the right changes have been made
        cy.get('@newPost').find('.model-box').first().children()
        .should('not.match','div')
        .should('have.length',2);

        cy.get('@newPost').should('not.contain','file')
                          .should('not.contain','postAuthorId');
    })

    it('Check if the \'Playlist\' schema button opens correctly', () => {
        // rename the element for quicker future use
        cy.get('.models #model-Playlist').as('playlist');

        // close the "Playlist" schema
        cy.get('@playlist').find('[style="cursor: pointer;"]').first().click();

        // check that the right changes have been made
        cy.get('@playlist').find('.model-box').children().should('match','div');
        cy.get('@playlist').should('contain','posts')
                          .should('contain','details')
                          .should('contain','playlistAuthorId')
                          .should('contain','NewPlaylist_details');
    })

    it('Check if the \'Playlist\' schema button closes correctly', () => {
        // rename the element for quicker future use
        cy.get('.models #model-Playlist').as('playlist');

        // open the "Playlist" schema
        cy.get('@playlist').find('[style="cursor: pointer;"]').first().click();

        // close the "Playlist" schema
        cy.get('@playlist').find('[style="cursor: pointer;"]').first().click();

        // check that the right changes have been made
        cy.get('@playlist').find('.model-box').first().children()
        .should('not.match','div')
        .should('have.length',2);
        cy.get('@playlist').should('not.contain','playlistAuthorId')
                           .should('not.contain','NewPlaylist_details');
    })
})