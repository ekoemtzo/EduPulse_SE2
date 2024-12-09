import * as controller from '../controllers/Posts.js'; // Adjust the path
import * as utils from '../utils/writer.js'; // Adjust the path

// Mock `res` object
function createMockRes() {
  return {
    status: null,
    data: null,
    headers: {},
    writeHead(status, headers) {
      this.status = status;
      this.headers = headers;
    },
    end(data) {
      this.data = JSON.parse(data);
    },
  };
}

// Happy Path Test
test('Happy Path: showUserPosts should return 200 with posts', async (t) => {
  // Mock service
  const mockService = {
    showUserPosts: async (userId) => ["Post 1", "Post 2"],
  };

  const req = { params: { userId: '123' } }; // Mock request
  const res = createMockRes(); // Mock response

  await controller.showUserPosts(req, res, null, req.params.userId, mockService);

  t.is(res.status, 200, 'Should respond with 200');
  t.deepEqual(res.data, ["Post 1", "Post 2"], 'Should return the list of posts');
});

// Unhappy Path: User Not Found
test('Unhappy Path: showUserPosts should return 404 if user does not exist', async (t) => {
  // Mock service
  const mockService = {
    showUserPosts: async (userId) => [],
  };

  const req = { params: { userId: '999' } }; // Mock request
  const res = createMockRes(); // Mock response

  await controller.showUserPosts(req, res, null, req.params.userId, mockService);

  t.is(res.status, 404, 'Should respond with 404');
  t.deepEqual(res.data, { error: 'User not found' }, 'Should return error message for user not found');
});

// Unhappy Path: Service Error
test('Unhappy Path: showUserPosts should return 500 if service fails', async (t) => {
  // Mock service
  const mockService = {
    showUserPosts: async () => {
      throw new Error('Database failure');
    },
  };

  const req = { params: { userId: '123' } }; // Mock request
  const res = createMockRes(); // Mock response

  await controller.showUserPosts(req, res, null, req.params.userId, mockService);

  t.is(res.status, 500, 'Should respond with 500');
  t.deepEqual(res.data, { error: 'Database failure' }, 'Should return error message for service failure');
});
