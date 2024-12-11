describe('Functional Tests for \'Delete Comment\' route', () => {
    beforeEach( () => {
        cy.visit("http://localhost:8080/docs/");
        // click the "delete comment" route button
        cy.get('.opblock-summary-delete > span[data-path="/posts/{postId}/comment/{commentId}"]').click(); 
    })

    it('Check if the button opens correctly', () => {
        cy.url().should('include','comment/deletePostComment');

        // check some of the phrases that should exist
        cy.contains('Parameters');
        cy.contains('Comment deleted successfully');
        cy.contains('US-6 Comment');
    })

    describe('Check the "Try it out" button', () => {
        beforeEach( () => {
            // click the "Try it out" button
            cy.get('#operations-comment-deletePostComment .opblock-body').contains('Try it out').click();
        })
    
        it('Check if the "Try it out" button opens correctly', () => {
            cy.get('.try-out__btn').should('have.text','Cancel');
            cy.contains('Execute');

            // check that the input fields are not disabled
            cy.get('input[placeholder="postId - ID of the post"]').should('not.have.attr','disabled');
            cy.get('input[placeholder="commentId - ID of the comment to delete"]').should('not.have.attr','disabled');
        })

        it('Try to "Execute"', () => {
            // type correct type values in the input fields 
            cy.get('input[placeholder="postId - ID of the post"]').type('1234');
            cy.get('input[placeholder="commentId - ID of the comment to delete"]').type('012');

            // click "Execute" 
            cy.get('#operations-comment-deletePostComment button.execute').click();

            // check some of the things that should exist
            cy.contains('curl -X DELETE "http://localhost:8080/posts/1234/comment/012" -H "accept: application/json"');
            cy.get('#operations-comment-deletePostComment .btn-clear').should('exist');
            cy.get('#operations-comment-deletePostComment .responses-inner').contains('Response headers');
        })

        it('Try to "Execute" with empty fields', () => {
            // click "Execute" 
            cy.get('button.execute').click();

            // check that it throws error
            cy.get('input[placeholder="postId - ID of the post"]')
            .should('have.class','invalid')
            .should('have.attr','title','Required field is not provided')
            .should('have.css','border-color','rgb(249, 62, 62)'); // a shade of red

            cy.get('input[placeholder="commentId - ID of the comment to delete"]')
            .should('have.class','invalid')
            .should('have.attr','title','Required field is not provided')
            .should('have.css','border-color','rgb(249, 62, 62)'); // a shade of red

            // check that it didn't display any new Responses
            cy.get('#operations-comment-deletePostComment .responses-inner').children()
            .should('have.length',1)
            .should('match','table');
        })

        it('Try to "Execute" with incorrect type values', () => {
            // type incorrect type values in the input fields 
            cy.get('input[placeholder="postId - ID of the post"]').type('bestPost');
            cy.get('input[placeholder="commentId - ID of the comment to delete"]').type('hello');

            // click "Execute" 
            cy.get('button.execute').click();

            // check that it throws error
            cy.get('input[placeholder="postId - ID of the post"]')
            .should('have.class','invalid')
            .should('have.attr','title','Value must be an integer')
            .should('have.css','border-color','rgb(249, 62, 62)'); // a shade of red

            cy.get('input[placeholder="commentId - ID of the comment to delete"]')
            .should('have.class','invalid')
            .should('have.attr','title','Value must be an integer')
            .should('have.css','border-color','rgb(249, 62, 62)'); // a shade of red

            // check that it didn't display any new Responses
            cy.get('#operations-comment-deletePostComment .responses-inner').children()
            .should('have.length',1)
            .should('match','table');
        })

        it('Check the "Clear" button', () => {
            // type correct type values in the input fields 
            cy.get('input[placeholder="postId - ID of the post"]').type('1234');
            cy.get('input[placeholder="commentId - ID of the comment to delete"]').type('012');

            // click "Execute" 
            cy.get('button.execute').click();

            //click "Clear"
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

        it('Check the "Cancel" button', () => {
            // click "Cancel"
            cy.get('.try-out__btn').click();

            // check that it works correctly 
            cy.get('.try-out__btn').should('have.text','Try it out ');
            cy.get('.execute-wrapper').should('not.have.descendants');
            cy.get('.btn-group').should('not.exist');

            // check that the input fields are disabled
            cy.get('input[placeholder="postId - ID of the post"]').should('have.attr','disabled');
            cy.get('input[placeholder="commentId - ID of the comment to delete"]').should('have.attr','disabled');
        })
    })
})
