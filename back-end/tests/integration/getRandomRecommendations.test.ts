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

describe('Testing get random recommendations...', () => {
  it('Getting 100 random recommendations, must return 200 each time and 60~80 with more than 10 upvotes',
  async () => {
    const rec1 = recommendationFactory();
    const rec2 = recommendationFactory();
    await prisma.recommendation.createMany({
      data: [
        {
          name: rec1.name,
          youtubeLink: rec1.youtubeLink,
          score: 5
        },
        {
          name: rec2.name,
          youtubeLink: rec2.youtubeLink,
          score: 20
        }
      ]
    });
    let recsWithHighScore: number = 0;
    let returned200EveryTime: boolean = true;
    for (let i = 0; i < 100; i++) {
      const response = await supertest(app).get('/recommendations/random');
      if (response.status === 200) {
        if (response.body.score > 10) recsWithHighScore++;
      } else {
        returned200EveryTime = false;
        break;
      }
    }
    console.log(recsWithHighScore);
    expect(recsWithHighScore).toBeGreaterThanOrEqual(60);
    expect(recsWithHighScore).toBeLessThanOrEqual(80);
    expect(returned200EveryTime).toBe(true);
  });

  it('Getting random with an empty db, must return 404', async () => {
    const response = await supertest(app).get('/recommendations/random');
    expect(response.status).toBe(404);
  });
});