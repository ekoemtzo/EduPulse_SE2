const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js");

/**
 * Opens server, before tests.
 */
test.before(async (t) => {
  // Create server
  t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({
    responseType: "json",
    prefixUrl: `http://localhost:${port}`,
  });
});

/**
 * Closes server, after tests.
 */
test.after.always(async (t) => {
  // Close the server
  t.context.server.close();
});

test("uploadPost - Successful creation of a post", async (t) => {
    try {
        // Prepare the request body
        const requestBody = {
            userId: 1,
            title: "New Post Title",
            category: "Tech",
        };

        // POST request to create a new post
        const postResponse = await t.context.got.post(`posts`, { json: requestBody });

        // Assertions
        t.is(postResponse.statusCode, 200, "Should return 200 OK for successful post creation");
        t.truthy(postResponse.body, "Response body should not be empty");

        // Validate the returned post
        t.is(postResponse.body.userId, requestBody.userId, "User ID in the response should match the request");
        t.is(postResponse.body.title, requestBody.title, "Title in the response should match the request");
        t.is(postResponse.body.category, requestBody.category, "Category in the response should match the request");
        t.truthy(postResponse.body.postId, "Post ID should be present in the response");

    } catch (error) {
        t.fail(`Test encountered an unexpected error: ${error.message}`);
    }
});

test("uploadPost - Missing required field 'title'", async (t) => {
    try {
        const requestBody = {
            userId: 1,
            category: "Article",
        };

        await t.context.got.post(`posts`, { json: requestBody });
        t.fail("Expected uploadPost to throw an error due to missing 'title'");
    } catch (error) {
        t.is(error.response.statusCode, 400, "Should return 400 Bad Request for missing title");
        t.is(error.response.body.message, "userId, title, and category are required to upload a post.");
    }
});

test("uploadPost - Missing required field 'category'", async (t) => {
    try {
        const requestBody = {
            userId: 1,
            title: "New Post Title",
        };

        await t.context.got.post(`posts`, { json: requestBody });
        t.fail("Expected uploadPost to throw an error due to missing 'category'");
    } catch (error) {
        t.is(error.response.statusCode, 400, "Should return 400 Bad Request for missing category");
        t.is(error.response.body.message, "userId, title, and category are required to upload a post.");
    }
});

test("uploadPost - Missing userId", async (t) => {
    try {
        const requestBody = {
            title: "New Post Title 2",
            category: "Article",
        };

        await t.context.got.post(`posts`, { json: requestBody });
        t.fail("Expected uploadPost to throw an error due to missing userId");
    } catch (error) {
        t.is(error.response.statusCode, 400, "Should return 400 Bad Request for missing userId");
        t.is(error.response.body.message, "userId, title, and category are required to upload a post.");
    }
});

test("uploadPost - Invalid userId (non-integer)", async (t) => {
    try {
        const requestBody = {
            userId: "abc", 
            title: "New Post Title",
            category: "Tech",
        };

        await t.context.got.post(`posts`, { json: requestBody });
        t.fail("Expected uploadPost to throw an error due to non-integer userId");
    } catch (error) {
        t.is(error.response.statusCode, 400, "Should return 400 Bad Request for invalid userId");
        t.is(error.response.body.message, "userId must be an integer.");
    }
});

