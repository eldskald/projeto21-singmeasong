import supertest from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/database';
import recommendationFactory from '../../prisma/factories/recommendationFactory';

beforeEach(async () => {
  await prisma.$queryRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testing recommendation creation...', () => {
  it('Correct input, must return 201', async () => {
    const rec = {
      name: 'Falamansa - Xote dos Milagres',
      youtubeLink: 'https://www.youtube.com/watch?v=chwyjJbcs1Y'
    };
    const response = await supertest(app)
      .post('/recommendations')
      .send(rec);
    expect(response.status).toBe(201);
  });

  it('Not sending name, must return 422', async () => {
    const rec = recommendationFactory();
    const response = await supertest(app)
      .post('/recommendations')
      .send({ youtubeLink: rec.youtubeLink });
    expect(response.status).toBe(422);
  });

  it('Not sending youtube link, must return 422', async () => {
    const rec = recommendationFactory();
    const response = await supertest(app)
      .post('/recommendations')
      .send({ name: rec.name });
    expect(response.status).toBe(422);
  });

  it('Sending non-youtube link, must return ???', async () => {
    const rec = recommendationFactory();
    const response = await supertest(app)
      .post('/recommendations')
      .send(rec);
    expect(response.status).toBe(422);
  })
});