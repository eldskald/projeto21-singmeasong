import { recommendationRepository as repository } from '../../src/repositories/recommendationRepository';
import { recommendationService as service, CreateRecommendationData } from '../../src/services/recommendationsService';
import recommendationFactory from '../../prisma/factories/recommendationFactory';
import { Recommendation } from '@prisma/client';

describe('Testing downvote()...', () => {
  const data: CreateRecommendationData = recommendationFactory();
  const rec: Recommendation = { ...data, id: 1, score: 0};
  jest.spyOn(repository, 'updateScore').mockImplementation(
    async (id: number, operation: 'increment' | 'decrement') => {
      return {
        id,
        name: rec.name,
        youtubeLink: rec.youtubeLink,
        score: rec.score + (operation === 'increment' ? 1 : -1)
      };
    }
  );
  jest.spyOn(repository, 'find').mockImplementation(
    (id: number): any => {
      return true;
    }
  );
  jest.spyOn(repository, 'remove').mockImplementation(
    (id: number): any => {
      return true;
    }
  );

  it('Testing with more than -5 dislikes', async () => {
    let result: boolean = true;
    try {
      await service.downvote(1);
    } catch (_err) {
      result = false;
    }
    expect(result).toBe(true);
    expect(repository.updateScore).toBeCalled();
  });

  it('Testing with -5 dislikes', async () => {
    rec.score = -5;
    let result: boolean = true;
    try {
      await service.downvote(1);
    } catch (_err) {
      result = false;
    }
    expect(result).toBe(true);
    expect(repository.updateScore).toBeCalled();
    expect(repository.remove).toBeCalled();
  });
});

