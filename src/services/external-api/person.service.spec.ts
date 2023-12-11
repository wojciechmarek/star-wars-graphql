import { PersonApiService } from './person.service';

describe('PersonApiService', () => {
  let personApiService: PersonApiService;

  beforeEach(() => {
    process.env = Object.assign(process.env, {
      SWAPI_BASE_URL: 'https://swapi.dev/api',
    });
    personApiService = new PersonApiService();
  });

  describe('getAllPeople', () => {
    fit('should return an array of people', async () => {
      const people = await personApiService.getAllPeople();
      expect(people).toBeDefined();
      expect(Array.isArray(people)).toBe(true);
    }, 50000);
  });
});
