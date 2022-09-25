import { recommendationRepository as repository } from '../../src/repositories/recommendationRepository';
import { recommendationService as service, CreateRecommendationData } from '../../src/services/recommendationsService';
import * as errorUtils from '../../src/utils/errorUtils';
import recommendationFactory from '../../prisma/factories/recommendationFactory';

it('Testing insert()...', async () => {
  jest.spyOn(repository, 'findByName').mockImplementation(() => null);
  jest.spyOn(errorUtils, 'conflictError').mockImplementation(() => null);
  jest.spyOn(repository, 'create').mockImplementation(
    async (data: CreateRecommendationData) => { return; }
  );
  let result: boolean = true;
  const rec: CreateRecommendationData = recommendationFactory();
  try {
    await service.insert(rec)
  } catch (_err) {
    result = false;
  }
  expect(result).toBe(true);
  expect(repository.create).toBeCalled();
});