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

    assert.strictEqual(request.status, 201);

    const result = await request.json();
    assert.deepStrictEqual(
      result.success,
      'User created with success!!',
      'it should return a valid text message'
    );

    // quando o dado for criado, quero receber o id da api
    // testo se é maior que 30, por causa da especificação do UUID
    assert.ok(result.id.length > 30, 'it should be a valid uuid');
  });

  await promisify(server.close.bind(server))();
});
