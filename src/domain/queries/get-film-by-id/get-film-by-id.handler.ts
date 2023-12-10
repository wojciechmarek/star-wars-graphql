import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFilmByIdQuery } from './get-film-by-id.query';

@QueryHandler(GetFilmByIdQuery)
export class GetFilmByIdQueryHandler
  implements IQueryHandler<GetFilmByIdQuery>
{
  constructor() {}
  async execute(query: GetFilmByIdQuery) {
    return [];
  }
}
