describe('UI Tests', () => {
    beforeEach( () => {
        cy.visit("http://localhost:8080/docs/");
    })

    it('Check if the page is displayed correctly', () => {
        // check that some expected texts exist
        cy.get('head title').should('have.text','Swagger UI');
        cy.get('h2.title').should('have.text','EduPulse 2.0.0 OAS3');
        cy.contains('API for EduPulse');
        cy.contains('Explore');
        cy.contains('Schemas');
    })

    it('Check that the \'Terms of Service\' link opens', () => {
        cy.get('div.info__tos a').should('have.attr','target','_blank') // check that it opens a new tab
        .and('have.attr','href').and('include','http://swagger.io/terms/');  // check the url that it opens to
    })

    it('Check if it has the correct resourses', () => {
        // check that all 4 resources exist
        cy.get('[id^=operations-tag-]').should('have.length',4)
        .should('contain','user')
        .should('contain','comment')
        .should('contain','posts')
        .should('contain','playlist');
    })

    it('Check if each resource has the correct number of routes', () => {
        cy.get('.opblock-tag-section > h4[id$=user] + div').children().should('have.length',1);
        cy.get('.opblock-tag-section > h4[id$=posts] + div').children().should('have.length',6);
        cy.get('.opblock-tag-section > h4[id$=comment] + div').children().should('have.length',2);
        cy.get('.opblock-tag-section > h4[id$=playlist] + div').children().should('have.length',4);
    })

    it('Check if all the Schemas exist', () => {
        cy.get('.models h4').should('have.text','Schemas'); // check that Schemas exist
        cy.get('.models > div').children().should('have.length',10); // check that it displays 10 schemas

        // check that it has all the expected schemas
        const expected = ['User','NewPost','Post','NewComment','Comment','NewPlaylist',
                             'Playlist','Error','NewPost_details','NewPlaylist_details'];
        
        expected.forEach((text) => {
            cy.get(`.models >> [id^=model-${text}]`)
            .should('exist')            // check that the element for the schema exists
            .should('contain.text',text);  // check that it displays the correct name in the page
        })

    })

})