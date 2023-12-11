import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMostOftenNameQuery } from './get-most-often-name.query';
import { FilmApiService, PersonApiService } from 'src/services/external-api';
import { CacheService } from 'src/services/persistence';
import { Film, Person } from 'src/models';

@QueryHandler(GetMostOftenNameQuery)
export class GetMostOftenNameQueryHandler
  implements IQueryHandler<GetMostOftenNameQuery>
{
  constructor(
    private readonly personApiService: PersonApiService,
    private readonly filmApiService: FilmApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(): Promise<string[]> {
    const cachedAllPeople = await this.cacheService.manageCache<Person[]>(
      `GetMostOftenNameQuery-people`,
      () => this.personApiService.getAllPeople(),
    );

    const peopleNames = cachedAllPeople.map((person) => person.name);

    const cachedAllFilms = await this.cacheService.manageCache<Film[]>(
      `GetUniqueWordsQuery`,
      () => this.filmApiService.getAllFilms(),
    );

    const openingCrawls = cachedAllFilms.map((film) => film.opening_crawl);
    const onlyWordsFromOpeningCrawls = openingCrawls
      .join(' ')
      .replace(/(\r\n|\n|\r)/gm, ' ')
      .replace(/[!.,]/g, ' ')
      .replace(/  +/g, ' ');

    const nameOccurrences: Record<string, number> = {};
    peopleNames.forEach((name) => {
      const regex = new RegExp(`\\b${name}\\b`, 'gi');
      const matches = onlyWordsFromOpeningCrawls.match(regex);
      const count = matches ? matches.length : 0;
      nameOccurrences[name] = count;
    });

    const theMostOftenNames = Object.keys(nameOccurrences).filter(
      (name) =>
        nameOccurrences[name] === Math.max(...Object.values(nameOccurrences)),
    );

    return theMostOftenNames;
  }
}
