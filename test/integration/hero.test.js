import test from 'node:test';
import assert from 'node:assert';
import { promisify } from 'node:util';

test('Hero integration test suite', async t => {
  const testPort = 9009;

  // bad practice
  process.env.PORT = testPort;
  const { server } = await import('../../src/index.js');

  const testServerAddress = `http://localhost:${testPort}/heroes`;

  await t.test('it should create a hero', async t => {
    const data = {
      id: 10,
      name: 'Batman',
      age: 50,
      power: 'rich',
    };

    const request = fetch(testServerAddress, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    // confirmanod o valor do default Header
    assert.deepStrictEqual(
      request.headers.get('content-type'),
      'application/json'
    );
  });

  await promisify(server.close.bind(server))();
});
