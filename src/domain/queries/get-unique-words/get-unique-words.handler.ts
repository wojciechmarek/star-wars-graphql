import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUniqueWordsQuery } from './get-unique-words.query';
import { FilmApiService } from 'src/services/external-api';
import { CacheService } from 'src/services/persistence';
import { Film } from 'src/models';

@QueryHandler(GetUniqueWordsQuery)
export class GetUniqueWordsQueryHandler
  implements IQueryHandler<GetUniqueWordsQuery>
{
  constructor(
    private readonly filmApiService: FilmApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute() {
    const cachedAllFilms = await this.cacheService.manageCache<Film[]>(
      `GetUniqueWordsQuery`,
      () => this.filmApiService.getAllFilms(),
    );

    return cachedAllFilms;
  }
}
