import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaginatedFilmsQuery } from './get-paginated-films.query';
import { FilmApiService } from 'src/services/external-api';

@QueryHandler(GetPaginatedFilmsQuery)
export class GetPaginatedFilmsQueryHandler
  implements IQueryHandler<GetPaginatedFilmsQuery>
{
  constructor(private readonly filmApiService: FilmApiService) {}

  async execute(query: GetPaginatedFilmsQuery) {
    const { page } = query;
    return this.filmApiService.getPaginatedFilms(page);
  }
}
