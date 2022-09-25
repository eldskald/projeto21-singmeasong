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

describe('Testing get top recommendations...', () => {
  it('Getting a random amount of a 100 random elements, should return 200 and the right array', async () => {
    let topScores: number[] = [0];
    const amount: number = Math.ceil(Math.random() * 20);
    for (let i = 0; i < 100; i++) {
      const rec = recommendationFactory();
      const score = Math.ceil(Math.random() * 100);
      await prisma.recommendation.create({ data: {...rec, score} });
      for (let i = 0; i < topScores.length; i++) {
        if (score >= topScores[i]) {
          topScores.splice(i, 0, score);
          if (topScores.length > amount) topScores.pop();
          break;
        }
      }
    }
    const response = await supertest(app).get(`/recommendations/top/${amount}`);
    expect(response.status).toBe(200);
    for (let i = 0; i < amount; i++) {
      expect(response.body[i].score).toBe(topScores[i]);
    }
  });

  it('Getting a random amount from a smaller than that db, should return 200 and the db', async () => {
    let topScores: number[] = [0];
    const amount: number = Math.ceil(Math.random() * 20) + 10;
    for (let i = 0; i < 10; i++) {
      const rec = recommendationFactory();
      const score = Math.ceil(Math.random() * 100);
      await prisma.recommendation.create({ data: {...rec, score} });
      for (let i = 0; i < topScores.length; i++) {
        if (score >= topScores[i]) {
          topScores.splice(i, 0, score);
          break;
        }
      }
    }
    topScores.pop();
    const response = await supertest(app).get(`/recommendations/top/${amount}`);
    expect(response.status).toBe(200);
    for (let i = 0; i < 10; i++) {
      expect(response.body[i].score).toBe(topScores[i]);
    }
  });

  it('Getting a random amount from an empty db, should return 200 and an empty array', async () => {
    const amount: number = Math.ceil(Math.random() * 100);
    const response = await supertest(app).get(`/recommendations/top/${amount}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});