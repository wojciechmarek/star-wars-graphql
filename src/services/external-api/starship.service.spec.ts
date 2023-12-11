import { StarshipApiService } from './starship.service';

describe('StarshipApiService', () => {
  let starshipApiService: StarshipApiService;

  beforeEach(() => {
    process.env = Object.assign(process.env, {
      SWAPI_BASE_URL: 'https://swapi.dev/api',
    });
    starshipApiService = new StarshipApiService();
  });

  describe('getStarshipById', () => {
    it('should return a starship object when given a valid id', async () => {
      const name = 'CR90 corvette';
      const id = 2;
      const starship = await starshipApiService.getStarshipById(id);
      expect(starship).toBeDefined();
      expect(starship.name).toBe(name);
    });

    it('should throw an error when given an invalid id', async () => {
      const id = -1;
      await expect(starshipApiService.getStarshipById(id)).rejects.toThrow();
    });
  });

  describe('getPaginatedStarships', () => {
    it('should return an array of starships when given a valid page number', async () => {
      const page = 1;
      const starships = await starshipApiService.getPaginatedStarship(page);

      expect(starships).toBeDefined();
      expect(Array.isArray(starships)).toBe(true);
    }, 10000);

    it('should throw an error when given an invalid page number', async () => {
      const page = -1;
      await expect(
        starshipApiService.getPaginatedStarship(page),
      ).rejects.toThrow();
    });
  });
});
