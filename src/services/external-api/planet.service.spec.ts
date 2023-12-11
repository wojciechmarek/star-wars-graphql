import { PlanetApiService } from './planet.service';

describe('PlanetApiService', () => {
  let planetApiService: PlanetApiService;

  beforeEach(() => {
    process.env = Object.assign(process.env, {
      SWAPI_BASE_URL: 'https://swapi.dev/api',
    });
    planetApiService = new PlanetApiService();
  });

  describe('getPlanetById', () => {
    it('should return a planet object when given a valid id', async () => {
      const name = 'Tatooine';
      const id = 1;
      const planet = await planetApiService.getPlanetById(id);
      expect(planet).toBeDefined();
      expect(planet.name).toBe(name);
    });

    it('should throw an error when given an invalid id', async () => {
      const id = -1;
      await expect(planetApiService.getPlanetById(id)).rejects.toThrow();
    });
  });

  describe('getPaginatedPlanets', () => {
    it('should return an array of planets when given a valid page number', async () => {
      const page = 1;
      const planets = await planetApiService.getPaginatedPlanets(page);

      expect(planets).toBeDefined();
      expect(Array.isArray(planets)).toBe(true);
    }, 10000);

    it('should throw an error when given an invalid page number', async () => {
      const page = -1;
      await expect(
        planetApiService.getPaginatedPlanets(page),
      ).rejects.toThrow();
    });
  });
});
