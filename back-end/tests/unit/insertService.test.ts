import { recommendationRepository as repository } from '../../src/repositories/recommendationRepository';
import { recommendationService as service, CreateRecommendationData } from '../../src/services/recommendationsService';
import recommendationFactory from '../../prisma/factories/recommendationFactory';

describe('Testing insert()...', () => {
  jest.spyOn(repository, 'create').mockImplementation(
    async (data: CreateRecommendationData) => { return; }
  );

  it('Testing with a succesful insertion', async () => {
    const rec: CreateRecommendationData = recommendationFactory();
    jest.spyOn(repository, 'findByName').mockImplementation(() => null);
    let result: boolean = true;
    try {
      await service.insert(rec)
    } catch (_err) {
      result = false;
    }
    expect(result).toBe(true);
    expect(repository.create).toBeCalled();
  });

  it('Testing an insertion of a recommendation with a same name', async () => {
    const rec: CreateRecommendationData = recommendationFactory();
    jest.spyOn(repository, 'findByName').mockImplementation(
      (_name: string): any => ({ ...rec, id: 1, score: 0 })
    );
    let result: boolean = true;
    try {
      await service.insert(rec);
      result = false;
    } catch (err) {
      if (err.type != 'conflict') result = false;
    }
    expect(result).toBe(true);
    expect(repository.create).toBeCalled();
  });
});
