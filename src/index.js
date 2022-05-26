import http from 'node:http';

const PORT = process.env.PORT || 3000;

const server = http
  .createServer((request, response) => {
    response.end('Hello World!');
  })
  .listen(PORT, () => `Server started at ${PORT}`);

export { server };
