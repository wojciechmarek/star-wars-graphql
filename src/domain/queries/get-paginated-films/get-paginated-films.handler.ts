import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaginatedFilmsQuery } from './get-paginated-films.query';

@QueryHandler(GetPaginatedFilmsQuery)
export class GetPaginatedFilmsQueryHandler
  implements IQueryHandler<GetPaginatedFilmsQuery>
{
  constructor() {}
  async execute(query: GetPaginatedFilmsQuery) {
    return [];
  }
}
