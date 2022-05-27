import { randomUUID } from 'node:crypto';
class Hero {
  constructor({ name, age, power }) {
    this.id = randomUUID();
    this.name = name;
    this.age = age;
    this.power = power;
  }
}

export { Hero };
