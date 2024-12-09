const test = require('ava');
const listen = require('test-listen');
const got = require('got');
const http = require('node:http');

const app = require('../index')

test.before(async (t) => {
    t.context.server = http.createServer(app);
    t.context.prefixUrl = await listen(t.context.server);
    const server = t.context.server.listen();
    const { port } = server.address(); 
    t.context.got = got.extend({ http2: true, throwHttpErrors: false, responseType: 'json', prefixUrl: t.context.prefixUrl });
});

test.after((t) => {
    t.context.server.close();
});
