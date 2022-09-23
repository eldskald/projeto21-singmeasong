import { faker } from '@faker-js/faker';
import { Recommendation } from '@prisma/client'

function recommendationFactory(): Omit<Recommendation, 'id' | 'score'> {
  return {
    name: faker.lorem.words(3),
    youtubeLink: faker.internet.url()
  };
};

export default recommendationFactory;