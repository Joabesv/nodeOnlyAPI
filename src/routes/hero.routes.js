const routes = ({ heroService }) => ({
  '/heroes:get': async (request, response) => {
    response.write('GET');
    response.end();
  },

  '/heroes:post': async (request, response) => {
    response.write('POST');
    response.end();
  },
});

export { routes };
