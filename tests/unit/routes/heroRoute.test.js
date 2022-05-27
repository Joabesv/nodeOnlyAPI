import test from 'node:test';
import assert from 'node:assert';
const callTracker = new assert.CallTracker();
process.on('exit', () => callTracker.verify());
import { routes } from '../../../src/routes/hero.routes.js';
import { DEFAULT_HEADER } from '../../../src/util/index.js';

test('hero routes - endpoints test suite', async t => {
  await t.todo('it should call /heroes:get route', async () => {
    const databaseMock = [
      {
        id: 'bc0226d8-a7e1-4d52-b8f2-d512f7f5bbcb',
        name: 'Batman',
        age: 50,
        power: 'rich',
      },
    ];
    // copiando o comportamento
    const heroServiceStub = {
      find: async () => databaseMock,
    };

    const endpoints = routes({
      heroServiceStub,
    });

    const endpoint = '/heroes:get';
    const request = {};
    const response = {
      write: callTracker.calls(item => {
        const expected = JSON.stringify({
          results: stubResult,
        });
        assert.strictEqual(
          item,
          expected,
          'write should be called with the correct payload'
        );
      }),
      // tenho que testar a função sendo chamada sem args
      end: callTracker.calls(item => {
        const expected = undefined;
        assert.strictEqual(
          item,
          expected,
          'end should be called without params'
        );
      }),
    };
    const route = endpoints[endpoint];
    await route(request, response);
  });
  await t.todo('it should call /heroes:post route');
});
