const http = require("http");
const test = require("ava");
const got = require("got");
const app = require("../index.js");

//Opens server, before tests.

test.before(async (t) => {
  // Create server
  t.context.server = http.createServer(app);
  const server = t.context.server.listen();
  const { port } = server.address();
  t.context.got = got.extend({
    responseType: "json",
    prefixUrl: http://localhost:${port},
  });
});

//Closes server, after tests.

test.after.always(async (t) => {
  // Close the server
  t.context.server.close();
});
