const test = require("ava");

// Test case for successful deletion of a post
test("Successful deletion of post (Happy Path)", async (t) => {
    const postId = 1; // Post ID for the test
    const userId = 1; // User ID for the test
    const response = await t.context.got.delete(`user/${userId}/posts/${postId}`); // Sending DELETE request to delete the post
    // Asserting that the response status code is 200, indicating successful deletion
    t.is(response.statusCode, 200, "Post deletion should return status 200");
});

// Test case for attempting to delete a non-existent post (Unhappy Path)
test("Deletion of non-existent post (Unhappy Path)", async (t) => {
    const postId = 999; // Non-existent Post ID
    const userId = 999; // Non-existent User ID
    try {
        // Sending DELETE request to a non-existent post
        const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
        t.fail("Expected error for non-existent post and user"); // Test should fail if no error is thrown
    } catch (error) {
        // Asserting that the status code is 404, indicating that the post was not found
        t.is(error.response.statusCode, 404, "Non-existent post should return 404");
        // Asserting the correct error message for non-existent post
        t.is(error.response.body.message, `No post found with postId: ${postId} for userId: ${userId}`);
    }
});

// Test case for undefined postId and userId in the request (Unhappy Path)
test("Deletion with undefined postId and userId (Unhappy Path)", async (t) => {
    const postId = undefined; // Undefined Post ID
    const userId = undefined; // Undefined User ID
    try {
        // Sending DELETE request with undefined parameters
        const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
        t.fail("Expected error for undefined postId and userId"); // Test should fail if no error is thrown
    } catch (error) {
        // Asserting that the status code is 400, indicating a bad request due to invalid parameters
        t.is(error.response.statusCode, 400, "Undefined userId or postId should return 400");
        // Asserting the correct error message for undefined parameters
        t.is(
            error.response.body.message,
            "request.params.userId should be integer, request.params.postId should be integer"
        );
    }
});

// Test case for undefined postId in the request (Unhappy Path)
test("Deletion with undefined postId (Unhappy Path)", async (t) => {
    const postId = undefined; // Undefined Post ID
    const userId = 1; // Valid User ID
    try {
        // Sending DELETE request with undefined postId
        const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
        t.fail("Expected error for undefined postId"); // Test should fail if no error is thrown
    } catch (error) {
        // Asserting that the status code is 400, indicating a bad request
        t.is(error.response.statusCode, 400, "Undefined postId should return 400");
        // Asserting the correct error message for undefined postId
        t.is(
            error.response.body.message,
            "request.params.postId should be integer"
        );
    }
});

// Test case for undefined userId in the request (Unhappy Path)
test("Deletion with undefined userId (Unhappy Path)", async (t) => {
    const postId = 1; // Valid Post ID
    const userId = undefined; // Undefined User ID
    try {
        // Sending DELETE request with undefined userId
        const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
        t.fail("Expected error for undefined userId"); // Test should fail if no error is thrown
    } catch (error) {
        // Asserting that the status code is 400, indicating a bad request
        t.is(error.response.statusCode, 400, "Undefined userId should return 400");
        // Asserting the correct error message for undefined userId
        t.is(
            error.response.body.message,
            "request.params.userId should be integer"
        );
    }
});

// Test case for unsuccessful deletion due to negative postId and userId (Unhappy Path)
test("Unsuccessful deletion of post: Negative postId and userId in path", async (t) => {
    const postId = -2; // Negative Post ID
    const userId = -2; // Negative User ID

    try {
        // Sending DELETE request with negative IDs
        const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
        t.fail("Expected the DELETE request to throw an error"); // Test should fail if no error is thrown
    } catch (error) {
        // Asserting that the status code is 400, indicating invalid data
        t.is(error.response.statusCode, 400);
        // Asserting the correct error message for negative IDs
        t.is(
            error.response.body.message,
            "'postId' and 'userId' must be positive integers."
        );
    }
});

// Test case for unsuccessful deletion due to null postId and userId (Unhappy Path)
test("Unsuccessful deletion of post: Null postId and userId in path", async (t) => {
    const postId = null; // Null Post ID
    const userId = null; // Null User ID

    try {
        // Sending DELETE request with null IDs
        const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
        t.fail("Expected the DELETE request to throw an error"); // Test should fail if no error is thrown
    } catch (error) {
        // Asserting that the status code is 400, indicating invalid data
        t.is(error.response.statusCode, 400);
        // Asserting the correct error message for null IDs
        t.is(
            error.response.body.message,
            "request.params.userId should be integer, request.params.postId should be integer"
        );
    }
});
