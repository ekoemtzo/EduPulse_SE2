const test = require("ava");

/**
 * Test for successful creation of a post
 * This test verifies that a new post can be successfully uploaded with the necessary fields.
 */
test("uploadPost - Successful creation of a post", async (t) => {
    try {
        // Prepare the request body with valid data for post creation
        const requestBody = {
            userId: 1,
            title: "New Post Title",  // Valid title
            category: "Tech",         // Valid category
        };

        // Send a POST request to create a new post
        const postResponse = await t.context.got.post(`posts`, { json: requestBody });

        // Assertions: Check for successful post creation
        t.is(postResponse.statusCode, 200, "Should return 200 OK for successful post creation");
        t.truthy(postResponse.body, "Response body should not be empty");

        // Validate the response data
        t.is(postResponse.body.userId, requestBody.userId, "User ID in the response should match the request");
        t.is(postResponse.body.title, requestBody.title, "Title in the response should match the request");
        t.is(postResponse.body.category, requestBody.category, "Category in the response should match the request");
        t.truthy(postResponse.body.postId, "Post ID should be present in the response");

    } catch (error) {
        // Handle unexpected errors and fail the test
        t.fail(`Test encountered an unexpected error: ${error.message}`);
    }
});

/**
 * Test for missing required field 'title' in the request body
 * This test verifies that an error is returned if the title is not provided.
 */
test("uploadPost - Missing required field 'title'", async (t) => {
    try {
        // Request body with missing 'title' field
        const requestBody = {
            userId: 1,
            category: "Article",  // Only category is provided
        };

        // Send a POST request to create a new post (should fail)
        await t.context.got.post(`posts`, { json: requestBody });
        t.fail("Expected uploadPost to throw an error due to missing 'title'");
    } catch (error) {
        // Validate that the correct error response is returned for missing 'title'
        t.is(error.response.statusCode, 400, "Should return 400 Bad Request for missing title");
        t.is(error.response.body.message, "userId, title, and category are required to upload a post.");
    }
});

/**
 * Test for missing required field 'category' in the request body
 * This test verifies that an error is returned if the category is not provided.
 */
test("uploadPost - Missing required field 'category'", async (t) => {
    try {
        // Request body with missing 'category' field
        const requestBody = {
            userId: 1,
            title: "New Post Title",  // Only title is provided
        };

        // Send a POST request to create a new post (should fail)
        await t.context.got.post(`posts`, { json: requestBody });
        t.fail("Expected uploadPost to throw an error due to missing 'category'");
    } catch (error) {
        // Validate that the correct error response is returned for missing 'category'
        t.is(error.response.statusCode, 400, "Should return 400 Bad Request for missing category");
        t.is(error.response.body.message, "userId, title, and category are required to upload a post.");
    }
});

/**
 * Test for missing 'userId' in the request body
 * This test verifies that an error is returned if the userId is not provided.
 */
test("uploadPost - Missing userId", async (t) => {
    try {
        // Request body with missing 'userId' field
        const requestBody = {
            title: "New Post Title 2",  // Title provided
            category: "Article",        // Category provided
        };

        // Send a POST request to create a new post (should fail)
        await t.context.got.post(`posts`, { json: requestBody });
        t.fail("Expected uploadPost to throw an error due to missing userId");
    } catch (error) {
        // Validate that the correct error response is returned for missing 'userId'
        t.is(error.response.statusCode, 400, "Should return 400 Bad Request for missing userId");
        t.is(error.response.body.message, "userId, title, and category are required to upload a post.");
    }
});

/**
 * Test for invalid 'userId' (non-integer) in the request body
 * This test verifies that an error is returned if the 'userId' is not an integer.
 */
test("uploadPost - Invalid userId (non-integer)", async (t) => {
    try {
        // Request body with invalid 'userId' (non-integer value)
        const requestBody = {
            userId: "abc",   // Invalid userId (string instead of integer)
            title: "New Post Title",
            category: "Tech",
        };

        // Send a POST request to create a new post (should fail)
        await t.context.got.post(`posts`, { json: requestBody });
        t.fail("Expected uploadPost to throw an error due to non-integer userId");
    } catch (error) {
        // Validate that the correct error response is returned for invalid 'userId'
        t.is(error.response.statusCode, 400, "Should return 400 Bad Request for invalid userId");
        t.is(error.response.body.message, "userId must be an integer.");
    }
});
