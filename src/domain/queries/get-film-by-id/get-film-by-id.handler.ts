import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFilmByIdQuery } from './get-film-by-id.query';
import { FilmApiService } from 'src/services/external-api';
import { Film } from 'src/api/models';
import { CacheService } from 'src/services/persistence';

@QueryHandler(GetFilmByIdQuery)
export class GetFilmByIdQueryHandler
  implements IQueryHandler<GetFilmByIdQuery>
{
  constructor(
    private readonly filmApiService: FilmApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(query: GetFilmByIdQuery): Promise<Film> {
    const { id } = query;
    const cachedFilm = await this.cacheService.manageCache<Film>(
      `GetFilmByIdQuery-${id}`,
      () => this.filmApiService.getFilmById(id),
    );
    return cachedFilm;
  }
}
