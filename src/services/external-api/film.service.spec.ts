import { FilmApiService } from './film.service';

describe('FilmApiService', () => {
  let filmApiService: FilmApiService;

  beforeEach(() => {
    process.env = Object.assign(process.env, {
      SWAPI_BASE_URL: 'https://swapi.dev/api',
    });
    filmApiService = new FilmApiService();
  });

  describe('getFilmById', () => {
    it('should return a film object when given a valid id', async () => {
      const title = 'A New Hope';
      const id = 1;
      const film = await filmApiService.getFilmById(id);
      expect(film).toBeDefined();
      expect(film.title).toBe(title);
    });

    it('should throw an error when given an invalid id', async () => {
      const id = -1;
      await expect(filmApiService.getFilmById(id)).rejects.toThrow();
    });
  });

  describe('getPaginatedFilms', () => {
    it('should return an array of films when given a valid page number', async () => {
      const page = 1;
      const films = await filmApiService.getPaginatedFilms(page);

      expect(films).toBeDefined();
      expect(Array.isArray(films)).toBe(true);
    }, 10000);

    it('should throw an error when given an invalid page number', async () => {
      const page = -1;
      await expect(filmApiService.getPaginatedFilms(page)).rejects.toThrow();
    });
  });

  describe('getAllFilms', () => {
    it('should return an array of films', async () => {
      const films = await filmApiService.getAllFilms();
      expect(films).toBeDefined();
      expect(Array.isArray(films)).toBe(true);
    }, 10000);
  });
});
