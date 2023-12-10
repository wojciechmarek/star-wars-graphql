import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaginatedFilmsQuery } from './get-paginated-films.query';
import { FilmApiService } from 'src/services/external-api';
import { Film } from 'src/models';
import { CacheService } from 'src/services/persistence';

@QueryHandler(GetPaginatedFilmsQuery)
export class GetPaginatedFilmsQueryHandler
  implements IQueryHandler<GetPaginatedFilmsQuery>
{
  constructor(
    private readonly filmApiService: FilmApiService,
    private readonly cacheService: CacheService,
  ) {}

  async execute(query: GetPaginatedFilmsQuery): Promise<Film[]> {
    const { page } = query;
    const cachedFilms = await this.cacheService.manageCache<Film[]>(
      `GetPaginatedFilmsQuery-${page}`,
      () => this.filmApiService.getPaginatedFilms(page),
    );
    return cachedFilms;
  }
}
