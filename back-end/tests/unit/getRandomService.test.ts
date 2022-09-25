import { recommendationRepository as repository } from '../../src/repositories/recommendationRepository';
import { recommendationService as service } from '../../src/services/recommendationsService';
import recommendationFactory from '../../prisma/factories/recommendationFactory';
import { Recommendation } from '@prisma/client';

describe('Testing getRandom()...', () => {
  it('Testing getRandom() percentage', async () => {
    const rec = recommendationFactory();
    jest.spyOn(repository, 'findAll').mockImplementation(
      (filter: any): any => {
        const result: Recommendation[] = [{
          id: 1,
          name: rec.name,
          youtubeLink: rec.youtubeLink,
          score: filter.scoreFilter === 'gt' ? 20 : 5
        }];
        return result;
      }
    );
    let highScores: number = 0;
    let result: boolean = true;
    for (let i = 0; i < 100; i++) {
      try {
        const foundRec = await service.getRandom();
        if (foundRec.score > 10) highScores++;
      } catch (_err) {
        result = false;
        break;
      }
    }
    expect(result).toBe(true);
    expect(highScores).toBeGreaterThanOrEqual(60);
    expect(highScores).toBeLessThanOrEqual(80);
    expect(repository.findAll).toBeCalledTimes(100);
  });

  it('Testing getRandom() on an empty db', async () => {
    jest.spyOn(repository, 'findAll').mockImplementation((): any => []);
    let result: boolean = true;
    try {
      await service.getRandom();
      result = false;
    } catch (err) {
      if (err.type != 'not_found') result = false;
    }
    expect(result).toBe(true);
    expect(repository.findAll).toBeCalled();
  });
});

