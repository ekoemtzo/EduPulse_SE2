const test = require("ava");

test("Post Comment - Successfully creates a new comment", async (t) => {
  try {
    // Set the postId and request body for submitting a new comment
    const postId = 72;
    const requestBody = {
      authorId: 23,
      content: "Love IT! Best.Podcast.Ever <3"
    };

    // POST request to create a new comment
    const response = await t.context.got.post(`posts/${postId}/comment`, { json: requestBody });

    // Assertion tests
    t.is(response.statusCode, 200, "Expected the status code to be 200 for successful creation, but got " + response.statusCode);
    t.truthy(response.body, "The response body should not be empty");

    // Check the returned comment
    t.truthy(response.body.commentId, "The response should contain the commentId");
    t.is(response.body.authorId, requestBody.authorId, "The authorid should match the request");
    t.is(response.body.content, requestBody.content, "The content should match the request");
    t.is(response.body.postId, postId, "The postId should match the request");
  }
  catch(error){
    t.fail("Unexpected error:"+ error.message);
  }
});

test("Post Comment - Missing the 'content' property", async (t) => {
  try{
    // Set the postId and request body for submitting a new comment
    const postId = 72;
    const requestBody = {
      authorId: 17
    };

    // POST request to create a new comment
    await t.context.got.post(`posts/${postId}/comment`, { json: requestBody });

    t.fail("Expected for the test to fail due to missing property");    
  }
  catch(error){
    // Check the response status code
    t.is(error.response.statusCode, 400, "Expected the status code to be 400 for missing property, but got " + error.response.statusCode);

    // Check if the error message mentions the missing 'content' property
    t.regex(error.response.body.message, /content/, "Error message should indicate the missing 'content' property.");

    // Check the exact expected error message
    t.is(error.response.body.message,"The postId, authorId and content are required to post a comment.");
  }
});

test("Post Comment - Missing the body request", async (t) => {
  try{
    // Set the postId for submitting a new comment
    const postId = 72;

    // POST request to create a new comment
    await t.context.got.post(`posts/${postId}/comment`);

    t.fail("Expected for the test to fail due to missing request body");    
  }
  catch(error){
    // Check the response status code
    t.is(error.response.statusCode, 415, "Expected the status code to be 415 for missing request body, but got " + error.response.statusCode);

    // Check the exact expected error message
    t.is(error.response.body.message,"unsupported media type undefined");
  }
});

test("Post Comment - Undefined 'postId' parameter", async (t) => {
  try{
    // Set the postId and request body for submitting a new comment
    const postId = undefined;
    const requestBody = {
      authorId: 17,
      content: "This is CRAZY good"
    };

    // POST request to create a new comment
    const response = await t.context.got.post(`posts/${postId}/comment`, { json: requestBody });

    t.fail("Expected for the test to fail due to undefined parameter");    
  }
  catch(error){
    // Check the response status code
    t.is(error.response.statusCode, 400, "Expected the status code to be 400 for missing property, but got " + error.response.statusCode);

    // Check if the error message mentions the undefined 'postId' parameter
    t.regex(error.response.body.message, /postId/, "Error message should indicate the undefined 'postId' parameter.");

    // Check the exact expected error message
    t.is(error.response.body.message,"request.params.postId should be integer");
  }
});

test("Post Comment - Wrong type 'postId' parameter", async (t) => {
  try{
    // Set the postId and request body for submitting a new comment
    const postId = "SamsPost";
    const requestBody = {
      authorId: 17,
      content: "This is CRAZY good"
    };

    // POST request to create a new comment
    const response = await t.context.got.post(`posts/${postId}/comment`, { json: requestBody });

    t.fail("Expected for the test to fail due to wrong type parameter");    
  }
  catch(error){
    // Check the response status code
    t.is(error.response.statusCode, 400, "Expected the status code to be 400 for wrong type parameter, but got" + error.response.statusCode);

    // Check if the error message mentions the wrong type 'postId' parameter
    t.regex(error.response.body.message, /postId/, "Error message should indicate the wrong type 'postId' parameter.");

    // Check the exact expected error message
    t.is(error.response.body.message,"request.params.postId should be integer");
  }
});

test("Post Comment - Wrong type 'authorId' property", async (t) => {
  try{
    // Set the postId and request body for submitting a new comment
    const postId = 72;
    const requestBody = {
      authorId: "Sam",
      content: "This is CRAZY good"
    };

    // POST request to create a new comment
    const response = await t.context.got.post(`posts/${postId}/comment`, { json: requestBody });

    t.fail("Expected for the test to fail due to wrong type property");    
  }
  catch(error){
    // Check the response status code
    t.is(error.response.statusCode, 400, "Expected the status code to be 400 for wrong type property, but got" + error.response.statusCode);

    // Check if the error message mentions the wrong type 'authorId' property
    t.regex(error.response.body.message, /authorId/, "Error message should indicate the wrong type 'authorId' property.");

    // Check the exact expected error message
    t.is(error.response.body.message,"request.body.authorId should be integer");
  }
});

test("Post Comment - Attempt to comment on a non-existent post", async (t) => {
  try{
    // Set the postId and request body for submitting a new comment
    const postId = 10;
    const requestBody = {
      authorId: 17,
      content: "This is CRAZY good"
    };

    // POST request to create a new comment
    const response = await t.context.got.post(`posts/${postId}/comment`, { json: requestBody });

    t.fail("Expected for the test to fail due to non-existent post");    
  }
  catch(error){
    // Check the response status code
    t.is(error.response.statusCode, 404, "Expected the status code to be 404 for non-existent post, but got" + error.response.statusCode);

    // Check the exact expected error message
    t.is(error.response.body.message,"Post could not be found.");
  }
});