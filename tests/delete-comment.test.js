const test = require("ava");

test("Delete Comment - Successfully deletes a comment", async (t) => {
  try {
    // Set the postId and commentId for submitting a new comment
    const postId = 8;
    const commentId = 4;

    // DELETE request to delete a comment
    const response = await t.context.got.delete(`posts/${postId}/comment/${commentId}`);

    // Assertion tests
    t.is(response.statusCode, 200, "Expected the status code to be 200 for successful creation, but got " + response.statusCode);
    t.truthy(response.body, "The response body should not be empty");
    t.truthy(response.body, "Comment deleted successfully.");
  }
  catch(error){
    t.fail("Unexpected error:"+ error.message);
  }
});

test("Delete Comment - Undefined 'postId' parameter", async (t) => {
  // Set the postId and commentId for submitting a new comment
  const postId = undefined;
  const commentId = 4;

  // DELETE request to delete a comment
  const error = await t.throwsAsync(
    () => t.context.got.delete(`posts/${postId}/comment/${commentId}`)
  );

  // Check the response status code
  t.is(error.response.statusCode, 400, "Expected the status code to be 400 for undefined parameter, but got " + error.response.statusCode);

  // Check if the error message mentions the undefined 'postId' parameter
  t.regex(error.response.body.message, /postId/, "Error message should indicate the undefined 'postId' parameter.");

  // Check the exact expected error message
  t.is(error.response.body.message,"request.params.postId should be integer");
})

test("Delete Comment - Undefined 'commentId' parameter", async (t) => {
  // Set the postId and commentId for submitting a new comment
  const postId = 8;
  const commentId = undefined;

  // DELETE request to delete a comment
  const error = await t.throwsAsync(
    () => t.context.got.delete(`posts/${postId}/comment/${commentId}`)
  );

  // Check the response status code
  t.is(error.response.statusCode, 400, "Expected the status code to be 400 for undefined parameter, but got " + error.response.statusCode);

  // Check if the error message mentions the undefined 'commentId' parameter
  t.regex(error.response.body.message, /commentId/, "Error message should indicate the undefined 'commentId' parameter.");

  // Check the exact expected error message
  t.is(error.response.body.message,"request.params.commentId should be integer");
})

test("Delete Comment -Wrong type 'postId' parameter", async (t) => {
  // Set the postId and commentId for submitting a new comment
  const postId = "bestPost";
  const commentId = 4;

  // DELETE request to delete a comment
  const error = await t.throwsAsync(
    () => t.context.got.delete(`posts/${postId}/comment/${commentId}`)
  );

   // Check the response status code
   t.is(error.response.statusCode, 400, "Expected the status code to be 400 for wrong type parameter, but got " + error.response.statusCode);

   // Check if the error message mentions the wrong type 'postId' parameter
   t.regex(error.response.body.message, /postId/, "Error message should indicate the wrong type 'postId' parameter.");
 
   // Check the exact expected error message
   t.is(error.response.body.message,"request.params.postId should be integer"); 
})

test("Delete Comment -Wrong type 'commentId' parameter", async (t) => {
  // Set the postId and commentId for submitting a new comment
  const postId = 8;
  const commentId = "myComment";

  // DELETE request to delete a comment
  const error = await t.throwsAsync(
    () => t.context.got.delete(`posts/${postId}/comment/${commentId}`)
  );

  // Check the response status code
  t.is(error.response.statusCode, 400, "Expected the status code to be 400 for wrong type parameter, but got " + error.response.statusCode);

  // Check if the error message mentions the wrong type 'commentId' parameter
  t.regex(error.response.body.message, /commentId/, "Error message should indicate the wrong type 'commentId' parameter.");

  // Check the exact expected error message
  t.is(error.response.body.message,"request.params.commentId should be integer");
})

test("Delete Comment - Attempt to delete a comment from a non-existent post", async (t) => {
  // Set the postId and commentId for submitting a new comment
  const postId = 37;
  const commentId = 3;

  // DELETE request to delete a comment
  const error = await t.throwsAsync(
    () => t.context.got.delete(`posts/${postId}/comment/${commentId}`)
  );

  // Check the response status code
  t.is(error.response.statusCode, 404, "Expected the status code to be 404 for non-existent post, but got" + error.response.statusCode);

  // Check the exact expected error message
  t.is(error.response.body.message,"Post could not be found.");

})

test("Delete Comment - Attempt to delete a non-existent comment", async (t) => {
  // Set the postId and commentId for submitting a new comment
  const postId = 8;
  const commentId = 10;

  // DELETE request to delete a comment
  const error = await t.throwsAsync(
    () => t.context.got.delete(`posts/${postId}/comment/${commentId}`)
  );

  // Check the response status code
  t.is(error.response.statusCode, 404, "Expected the status code to be 404 for non-existent post, but got" + error.response.statusCode);

  // Check the exact expected error message
  t.is(error.response.body.message,"Comment could not be found.");
})