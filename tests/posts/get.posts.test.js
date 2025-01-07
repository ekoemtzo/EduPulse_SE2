const test = require("ava");

/**
 * Test for successful fetch of posts by title and category
 * This test validates that posts are retrieved based on the title and category filters.
 */
test("findPosts - Successful fetch of posts by title and category", async (t) => {
    const title = "Electronics";  // Search filter: title
    const category = "Article";   // Search filter: category
    
    try {
        // Make the GET request to fetch posts based on the given filters
        const postsResponse = await t.context.got.get(`posts`, {
            searchParams: { title, category },
        });

        // Validate response status code
        t.is(postsResponse.statusCode, 200, "Should return 200 OK for successful retrieval");

        // Validate that the response body is not empty and is an array
        t.truthy(postsResponse.body, "Response body should not be empty");
        t.true(Array.isArray(postsResponse.body), "Response should be an array");

        // Loop through each post and validate that it meets the title and category filters
        postsResponse.body.forEach((post) => {
            t.truthy(post.title, "Each post should have title");
            t.truthy(post.category, "Each post should have a category");

            if (title) {
                t.true(
                    post.title.includes(title),
                    `Post title should include the search term: ${title}`
                );
            }
            if (category) {
                t.is(
                    post.category,
                    category,
                    `Post category should match the category: ${category}`
                );
            }
        });

    } catch (error) {
        // If an error occurs, fail the test with the error message
        t.fail(`Electronics encountered an unexpected error: ${error.message}`);
    }
});

/**
 * Test for unsuccessful fetch of posts by title and category
 * This test checks the scenario when no posts match the given criteria.
 */
test("findPosts - Unsuccessful fetch of posts by title and category", async (t) => {
    const title = "NonExistent";  // Invalid title for testing
    const category = "NonExistent";  // Invalid category for testing
    
    try {
        // Attempt to fetch posts that don't exist based on title and category
        const postsResponse = await t.context.got.get(`posts`, {
            searchParams: { title, category },
        });
        t.fail("Request should have failed with 404, but it did not");
    } catch (error) {
        // Validate the error message and status code for no results found
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, "No posts found matching the given criteria.");
    }
});

/**
 * Test for handling when title and category are not strings
 * This test checks the case where the title and category provided are not valid strings.
 */
test("findPosts - title and category are not strings", async (t) => {
    const title = 999;  // Invalid type for title
    const category = 999;  // Invalid type for category
    
    try {
        // Attempt to fetch posts with invalid title and category values
        const postsResponse = await t.context.got.get(`posts`, {
            searchParams: { title, category },
        });
        t.fail("Request should have failed with 404, but it did not");
    } catch (error) {
        // Validate that an error is thrown and the appropriate message is returned
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, "No posts found matching the given criteria.");
    }
});

/**
 * Test for only title being provided as a filter
 * This test checks the case where only the title filter is provided, and category is not specified.
 */
test("findPosts - Only title is provided", async (t) => {
    const title = "Electronics";  // Title filter provided
    const category = undefined;  // No category filter
    
    try {
        // Make the GET request to fetch posts based on title filter only
        const postsResponse = await t.context.got.get(`posts`, {
            searchParams: { title, category },
        });

        // Ensure that the posts match the title filter
        t.is(postsResponse.statusCode, 200, "Status code should be 200");
        postsResponse.body.forEach((post) => {
            t.true(post.title.includes(title), `Post title should contain: ${title}`);
        });
    } catch (error) {
        t.fail(`Unexpected error: ${error.message}`);
    }
});

/**
 * Test for only category being provided as a filter
 * This test checks the case where only the category filter is provided, and title is not specified.
 */
test("findPosts - Only category is provided", async (t) => {
    const title = undefined;  // No title filter
    const category = "Article";  // Category filter provided
    
    try {
        // Make the GET request to fetch posts based on category filter only
        const postsResponse = await t.context.got.get(`posts`, {
            searchParams: { title, category },
        });
        
        // Ensure that the posts match the category filter
        t.is(postsResponse.statusCode, 200);
        postsResponse.body.forEach((post) => {
            t.is(post.category, category);
        });
    } catch (error) {
        t.fail(`Unexpected error: ${error.message}`);
    }
});

/**
 * Test for both title and category being undefined
 * This test checks the scenario where no filters are provided, and all posts should be returned.
 */
test("findPosts - Both title and category are undefined", async (t) => {
    const title = undefined;  // No title filter
    const category = undefined;  // No category filter
    
    try {
        // Make the GET request to fetch all posts, as no filters are applied
        const postsResponse = await t.context.got.get(`posts`, {
            searchParams: { title, category },
        });

        // Ensure the response status is 200 (OK)
        t.is(postsResponse.statusCode, 200);

        // Ensure that at least one post is returned
        t.true(postsResponse.body.length > 0, "There should be at least one post returned");

        // Validate that all posts have title and category
        postsResponse.body.forEach((post) => {
            t.truthy(post.title, "Each post should have a title");
            t.truthy(post.category, "Each post should have a category");
        });
    } catch (error) {
        t.fail(`Unexpected error: ${error.message}`);
    }
});
