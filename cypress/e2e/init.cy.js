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

            // check that the input fields are not diasbled
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

            // check that the input fields are diasbled
            cy.get('input[placeholder="postId - ID of the post"]').should('have.attr','disabled');
            cy.get('input[placeholder="commentId - ID of the comment to delete"]').should('have.attr','disabled');
        })
    })
})

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

        // cy.get('#operations-playlist-editPlaylist .execute-wrapper').click();
    })

    describe('Check the "Try it out" button', () => {
        beforeEach( () => {
            // click the "Try it out" button
            cy.get('#operations-playlist-editPlaylist .try-out').click();
        })

        it('Check if the "Try it out" button opens correctly', () => {
            cy.get('.try-out__btn')
            .should('have.text','Cancel')
            .should('have.class','cancel');

            cy.contains('Execute');
            cy.get('.execute-wrapper')
            .should('have.length.above',0)
            .should('have.descendants','button');

            // check that the input fields are not diasbled
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
        })

        it('Check the "Cancel" button', () => {
            cy.get('#operations-playlist-editPlaylist').within( () => {
                // click "Cancel"
                cy.get('.try-out__btn').click();

                // check that it works correctly 
                cy.get('.try-out__btn').should('have.text','Try it out ');
                cy.get('.execute-wrapper').should('not.have.descendants');
                cy.get('.btn-group').should('not.exist');

                // check that the input fields are diasbled
                cy.get('input[placeholder="userId - ID of the playlistAuthor"]').should('have.attr','disabled');
                cy.get('input[placeholder="playlistId - ID of the playlist to edit"]').should('have.attr','disabled');
            })
        })

    })
})