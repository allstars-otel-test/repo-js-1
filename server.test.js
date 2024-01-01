const http = require('http');
const { promisify } = require('util');

const hostname = '127.0.0.1';
const port = 3000;
const server = require('./server');

const get = promisify(http.get);

test('responds to requests', async () => {
  server.listen(port, hostname);
  const response = await get(`http://${hostname}:${port}/`);
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    expect(data).toBe('Hello, World!\n');
    server.close();
  });
});
