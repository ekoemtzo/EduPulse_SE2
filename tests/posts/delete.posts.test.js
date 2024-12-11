const test = require("ava");

test("Successful deletion of post (Happy Path)", async (t) => {
    const postId = 1;
    const userId = 1;
    const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
    t.is(response.statusCode, 200, "Post deletion should return status 200");
  });

test("Deletion of non-existent post (Unhappy Path)", async (t) => {
    const postId = 999;
    const userId = 999;
    try {
      const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
      t.fail("Expected error for non-existent post and user");
    } catch (error) {
      t.is(error.response.statusCode, 404, "Non-existent post should return 404");
      t.is(error.response.body.message, `No post found with postId: ${postId} for userId: ${userId}`);
    }
  });

test("Deletion with undefined postId and userId (Unhappy Path)", async (t) => {
    const postId = undefined;
    const userId = undefined;
    try {
      const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
      t.fail("Expected error for undefined postId and userId");
    } catch (error) {
      t.is(error.response.statusCode, 400, "Undefined userId or postId should return 400");
      t.is(
        error.response.body.message,
        "request.params.userId should be integer, request.params.postId should be integer"
      );
    }
  });

  test("Deletion with undefined postId (Unhappy Path)", async (t) => {
    const postId = undefined;
    const userId = 1;
    try {
      const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
      t.fail("Expected error for undefined postId");
    } catch (error) {
      t.is(error.response.statusCode, 400, "Undefined postId should return 400");
      t.is(
        error.response.body.message,
        "request.params.postId should be integer"
      );
    }
  });

  test("Deletion with undefined userId (Unhappy Path)", async (t) => {
    const postId = 1;
    const userId = undefined;
    try {
      const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
      t.fail("Expected error for undefined userId");
    } catch (error) {
      t.is(error.response.statusCode, 400, "Undefined userId should return 400");
      t.is(
        error.response.body.message,
        "request.params.userId should be integer"
      );
    }
  });

  test("Unsuccessful deletion of post: Negative postId and userId in path", async (t) => {
    const postId = -2;
    const userId = -2;

    try {
      const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
      t.fail("Expected the DELETE request to throw an error");
    } catch (error) {
      t.is(error.response.statusCode, 400);
      t.is(
        error.response.body.message,
        "'postId' and 'userId' must be positive integers."
      );
    }
  });

  test("Unsuccessful deletion of post: Null postId and userId in path", async (t) => {
    const postId = null;
    const userId = null;

    try {
      const response = await t.context.got.delete(`user/${userId}/posts/${postId}`);
      t.fail("Expected the DELETE request to throw an error");
    } catch (error) {
      t.is(error.response.statusCode, 400);
      t.is(
        error.response.body.message,
        "request.params.userId should be integer, request.params.postId should be integer"
      );
    }
  });
  