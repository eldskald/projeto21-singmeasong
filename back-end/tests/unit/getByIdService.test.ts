import { recommendationRepository as repository } from '../../src/repositories/recommendationRepository';
import { recommendationService as service } from '../../src/services/recommendationsService';
import recommendationFactory from '../../prisma/factories/recommendationFactory';
import { Recommendation } from '@prisma/client';

describe('Testing getById()...', () => {
  it('Testing with a found result', async () => {
    const rec = recommendationFactory();
    jest.spyOn(repository, 'find').mockImplementation(
      (): any => ({ ...rec, id: 1, score: 0 })
    );
    let result: boolean = true;
    let foundRec: Recommendation | null = null;
    try {
      foundRec = await service.getById(1);
    } catch (_err) {
      result = false;
    }
    expect(result).toBe(true);
    expect(repository.find).toBeCalled();
    expect(foundRec).toEqual({ ...rec, id: 1, score: 0 });
  });

  it('Testing with no results to be found', async () => {
    const rec = recommendationFactory();
    jest.spyOn(repository, 'find').mockImplementation((): any => null);
    let result: boolean = true;
    let foundRec: Recommendation | null = null;
    try {
      foundRec = await service.getById(1);
      result = false;
    } catch (err) {
      if (err.type != 'not_found') result = false;
    }
    expect(result).toBe(true);
    expect(repository.find).toBeCalled();
  });
});

