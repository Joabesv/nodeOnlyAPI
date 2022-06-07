import { once } from 'node:events';
import { Hero } from '../entities/hero.js';
import { DEFAULT_HEADER } from '../util/index.js';
const routes = ({ heroService }) => ({
  '/heroes:get': async (request, response) => {
    const heroes = await heroService.find();
    response.write(JSON.stringify({ heroes }));
    response.end();
  },

  '/heroes:post': async (request, response) => {
    // once -> espero ocorrer o evento para capturar o valor
    const data = await once(request, 'data');
    const item = JSON.parse(data);
    const hero = new Hero(item);

    const id = await heroService.create(hero);
    response.writeHead(201, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        id,
        success: 'User created with success!!',
      })
    );
    return response.end();
  },

  '/heroes:patch': async (request, response) => {
    const data = await once(request, 'data');
    const item = JSON.parse(data);

    const id = await heroService.edit(item);

    response.writeHead(202, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        success: `Hero edited with success`,
        id,
      })
    );
    return response.end();
  },
});

export { routes };
