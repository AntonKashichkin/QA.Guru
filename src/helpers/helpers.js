import { faker } from '@faker-js/faker';

export class Helpers {
  constructor(page) {
    this.page = page;
    this.user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      };
      
      this.article = {
        title: faker.word.adjective({ length: { min: 5, max: 7 }, strategy: 'fail' }),
        about: faker.word.adjective({ length: { min: 5, max: 7 }, strategy: 'fail' }),
        text: faker.word.adjective({ length: { min: 5, max: 7 }, strategy: 'fail' }),
        tags: faker.word.adjective({ length: { min: 5, max: 7 }, strategy: 'fail' }),
      };
  }
}