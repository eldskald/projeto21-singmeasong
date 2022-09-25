import { recommendationRepository as repository } from '../../src/repositories/recommendationRepository';
import { recommendationService as service } from '../../src/services/recommendationsService';

it('Testing getTop()...', async () => {
  jest.spyOn(repository, 'getAmountByScore').mockImplementation(() => null);
  let result: boolean = true;
  try {
    await service.getTop(1);
  } catch (_err) {
    result = false;
  }
  expect(result).toBe(true);
  expect(repository.getAmountByScore).toBeCalled();
});