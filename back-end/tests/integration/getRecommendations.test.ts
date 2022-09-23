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

describe('Testing get recommendations...', () => {
  it('Testing with an empty db, must return 200 and an empty array', async () => {
    const response = await supertest(app).get('/recommendations');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('Testing with 1 to 9 recommendations, must return 200 and all of them', async () => {
    const recs: Omit<Recommendation, 'id' | 'score'>[] = [];
    const totalRecs: number = Math.ceil(Math.random() * 9);
    for (let i = 0; i < totalRecs; i++) {
      recs.push(recommendationFactory());
    }
    await prisma.recommendation.createMany({ data: recs });
    const response = await supertest(app).get('/recommendations');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(totalRecs);
  });

  it('Testing with more than 10 recommendations, must return 200 and the last 10 of them', async () => {
    const recs: Omit<Recommendation, 'id' | 'score'>[] = [];
    const totalRecs: number = Math.ceil(Math.random() * 9) + 10;
    for (let i = 0; i < totalRecs; i++) {
      recs.push(recommendationFactory());
    }
    await prisma.recommendation.createMany({ data: recs });
    const response = await supertest(app).get('/recommendations');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(10);
    expect(response.body[0].id).toBe(totalRecs);
  })
});