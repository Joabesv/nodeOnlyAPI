import { parse } from 'node:url';
import { DEFAULT_HEADER } from '../util/index.js';

const allRoutes = {
  '/heroes:get': (request, response) => {
    response.write('GET');
    response.end();
  },

  //404 routes
  default: (request, response) => {
    response.writeHead(404, DEFAULT_HEADER);
    response.write('uuuups, not found!');
    response.end();
  },
};

export function handler(request, response) {
  const { url, method } = request;
  const { pathname } = parse(url, true);
  const key = `${pathname}:${method.toLowerCase()}`;
  const chosen = allRoutes[key] || allRoutes.default;

  return chosen(request, response);
}
