import { recommendationRepository as repository } from '../../src/repositories/recommendationRepository';
import { recommendationService as service, CreateRecommendationData } from '../../src/services/recommendationsService';
import * as errorUtils from '../../src/utils/errorUtils';
import recommendationFactory from '../../prisma/factories/recommendationFactory';

jest.spyOn(repository, 'findByName').mockImplementation(() => null);
jest.spyOn(errorUtils, 'conflictError').mockImplementation(() => null);
jest.spyOn(repository, 'create').mockImplementation(
  async (data: CreateRecommendationData) => { return; }
);

it('Testing insert()...', async () => {
  let result: boolean | null = null;
  const rec: CreateRecommendationData = recommendationFactory();
  try {
    await service.insert(rec)
    result = true;
  } catch (_err) {
    result = false;
  }
  expect(result).toBe(true);
});