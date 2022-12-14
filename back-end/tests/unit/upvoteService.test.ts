import { recommendationRepository as repository } from '../../src/repositories/recommendationRepository';
import { recommendationService as service, CreateRecommendationData } from '../../src/services/recommendationsService';
import recommendationFactory from '../../prisma/factories/recommendationFactory';

it('Testing upvote()...', async () => {
  const rec: CreateRecommendationData = recommendationFactory();
  jest.spyOn(repository, 'updateScore').mockImplementation(
    async (id: number, operation: 'increment' | 'decrement') => {
      return {
        id,
        name: rec.name,
        youtubeLink: rec.youtubeLink,
        score: 1
      };
    }
  );
  jest.spyOn(repository, 'find').mockImplementation(
    (id: number): any => {
      return true;
    }
  );
  let result: boolean = true;
  try {
    await service.upvote(1);
  } catch (_err) {
    result = false;
  }
  expect(result).toBe(true);
  expect(repository.updateScore).toBeCalled();
});