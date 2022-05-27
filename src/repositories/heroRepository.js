import { readFile, writeFile } from 'node:fs/promises';

class HeroRepository {
  constructor({ file }) {
    // as outras camadas enviaram o dado
    // para poder testar se esta funcionando
    this.file = file;
  }

  async #currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  find() {
    return this.#currentFileContent();
  }

  async create(data) {
    const currentFile = await this.#currentFileContent();
    currentFile.push(data);

    await writeFile(this.file, JSON.stringify(currentFile));

    return data.id;
  }
}
/*
const heroRepository = new HeroRepository({
  file: './database/data.json',
});

console.log(
  await heroRepository.create({
    id: 2,
    name: 'Joabesv',
  })
);

console.log(await heroRepository.find());
*/

export { HeroRepository };
