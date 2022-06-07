// fazer edições antes de enviar para o banco de dados
class HeroService {
  constructor({ heroRepository }) {
    this.heroRepository = heroRepository;
  }

  find() {
    return this.heroRepository.find();
  }

  create(data) {
    return this.heroRepository.create(data);
  }

  edit(data) {
    return this.heroRepository.edit(data);
  }
}

export { HeroService };
