import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFilmByIdQuery } from './get-film-by-id.query';
import { FilmApiService } from 'src/services/external-api';
import { Film } from 'src/api/models';

@QueryHandler(GetFilmByIdQuery)
export class GetFilmByIdQueryHandler
  implements IQueryHandler<GetFilmByIdQuery>
{
  constructor(private readonly filmApiService: FilmApiService) {}
  async execute(query: GetFilmByIdQuery): Promise<Film> {
    const { id } = query;
    return this.filmApiService.getFilmById(id);
  }
}
