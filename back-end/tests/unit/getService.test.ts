import { recommendationRepository as repository } from '../../src/repositories/recommendationRepository';
import { recommendationService as service } from '../../src/services/recommendationsService';

it('Testing get()...', async () => {
  jest.spyOn(repository, 'findAll').mockImplementation(
    (): any => [] 
  );
  let result: boolean = true;
  try {
    await service.get()
  } catch (_err) {
    result = false;
  }
  expect(result).toBe(true);
  expect(repository.findAll).toBeCalled();
});