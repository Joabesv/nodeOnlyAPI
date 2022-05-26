import http from 'node:http';
import { handler } from './handler/index.js';

const PORT = process.env.PORT || 3000;

const server = http
  .createServer(handler)
  .listen(PORT, () => `Server started at ${PORT}`);

export { server };
