describe('Functional Tests for the button of the \'posts\' resource', () => {
    beforeEach( () => {
        cy.visit("http://localhost:8080/docs/");
        cy.get('#operations-tag-posts').click(); // click the button of the "posts" resources
    })

    it('Check if the button closes correctly', () => {
        cy.get('#operations-tag-posts').should('have.attr','data-is-open','false')
                                       .siblings('div').should('not.exist');       // check if the routes of this resource disappear
        cy.url().should('include','#/');
    })

    it('Check if the button reopens correctly',() => {
        cy.get('#operations-tag-posts').click();

        // check some of the phrases that should exist
        cy.contains('Returns all the Posts of a user');
        cy.contains('Delete a post');
        cy.contains('​/posts​/{postId}');

        cy.url().should('include','#/posts');
    })
})