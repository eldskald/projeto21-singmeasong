import supertest from 'supertest';
import app from '../../src/app';
import { prisma } from '../../src/database';
import recommendationFactory from '../../prisma/factories/recommendationFactory';
import { Recommendation } from '@prisma/client';

beforeEach(async () => {
  await prisma.$queryRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testing upvotes and downvotes...', () => {
  it('Upvoting, must return 200 and increase score by 1', async () => {
    const rec = recommendationFactory();
    await prisma.recommendation.create({ data: rec });
    const response = await supertest(app).post('/recommendations/1/upvote');
    const recFromDb: Recommendation | null = await prisma.recommendation
      .findUnique({ where: { id: 1 } });
    expect(response.status).toBe(200);
    expect(recFromDb.score).toBe(1);
  });

  it('Upvoting a inexistant recommendation, must return 404', async () => {
    const response = await supertest(app).post('/recommendations/1/upvoting');
    expect(response.status).toBe(404);
  });
});