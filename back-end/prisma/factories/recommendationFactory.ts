import { faker } from '@faker-js/faker';

function recommendationFactory() {
  return {
    name: faker.lorem.words(3),
    youtubeLink: faker.internet.url(),
  };
};

export default recommendationFactory;