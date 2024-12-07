const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js");

//  Opens server, before tests.
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

// Closes server, after tests.
test.after.always(async (t) => {
  // Close the server
  t.context.server.close();
});

test("findPosts - Successful fetch of posts by title and category", async (t) => {
    const title = "Electronics"; 
    const category = "Article";
    try {
        // Make the request to the API
        const postsResponse = await t.context.got.get(`posts`, {
            searchParams: { title, category },
        });

        // Validate response status code
        t.is(postsResponse.statusCode, 200, "Should return 200 OK for successful retrieval");

        // Validate response body
        t.truthy(postsResponse.body, "Response body should not be empty");
        t.true(Array.isArray(postsResponse.body), "Response should be an array");

        // Validate each returned post
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
        t.fail(`Electronics encountered an unexpected error: ${error.message}`);
    }
});


test("findPosts - Unuccessful fetch of posts by title and category", async (t) => {
    const title = "NonExistent"; 
    const category = "NonExistent";
    
    try {
        const postsResponse = await t.context.got.get(`posts`, {
            searchParams: { title, category },
        });
        t.fail("Request should have failed with 404, but it did not");
    } catch (error) {
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, "No posts found matching the given criteria.");
    }
});

test("findPosts - title and category are not strings", async (t) => {
    const title = 999;
    const category = 999;
    
    try {
        const postsResponse = await t.context.got.get(`posts`, {
            searchParams: { title, category },
        });
        t.fail("Request should have failed with 404, but it did not");
    } catch (error) {
        t.is(error.response.statusCode, 404);
        t.is(error.response.body.message, "No posts found matching the given criteria.");
    }
});

test("findPosts - Only title is provided", async (t) => {
    const title = "Electronics"; 
    const category = undefined;

    try {
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


test("findPosts - Only category is provided", async (t) => {
    const title = undefined;
    const category = "Article"; 
    
    try {
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

test("findPosts - Both title and category are undefined", async (t) => {
    const title = undefined; // title is undefined
    const category = undefined; // category is undefined
    
    try {
        const postsResponse = await t.context.got.get(`posts`, {
            searchParams: { title, category },
        });

        // Ensure that the response status is 200 (OK)
        t.is(postsResponse.statusCode, 200);

        // Ensure that all posts are returned
        t.true(postsResponse.body.length > 0, "There should be at least one post returned");

        // Validate that all posts are returned, as no filters are applied
        postsResponse.body.forEach((post) => {
            t.truthy(post.title, "Each post should have a title");
            t.truthy(post.category, "Each post should have a category");
        });
    } catch (error) {
        t.fail(`Unexpected error: ${error.message}`);
    }
});


