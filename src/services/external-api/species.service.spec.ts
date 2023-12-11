import { SpeciesApiService } from './species.service';

describe('SpeciesApiService', () => {
  let speciesApiService: SpeciesApiService;

  beforeEach(() => {
    process.env = Object.assign(process.env, {
      SWAPI_BASE_URL: 'https://swapi.dev/api',
    });
    speciesApiService = new SpeciesApiService();
  });

  describe('getSpeciesById', () => {
    it('should return a species object when given a valid id', async () => {
      const name = 'Human';
      const id = 1;
      const species = await speciesApiService.getSpeciesById(id);
      expect(species).toBeDefined();
      expect(species.name).toBe(name);
    }, 10000);

    it('should throw an error when given an invalid id', async () => {
      const id = -1;
      await expect(speciesApiService.getSpeciesById(id)).rejects.toThrow();
    });
  });

  describe('getPaginatedSpecies', () => {
    it('should return an array of species when given a valid page number', async () => {
      const page = 1;
      const species = await speciesApiService.getPaginatedSpecies(page);

      expect(species).toBeDefined();
      expect(Array.isArray(species)).toBe(true);
    }, 10000);

    it('should throw an error when given an invalid page number', async () => {
      const page = -1;
      await expect(
        speciesApiService.getPaginatedSpecies(page),
      ).rejects.toThrow();
    });
  });
});
