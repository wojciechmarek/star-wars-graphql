import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUniqueWordsQuery } from './get-unique-words.query';

@QueryHandler(GetUniqueWordsQuery)
export class GetUniqueWordsQueryHandler
  implements IQueryHandler<GetUniqueWordsQuery>
{
  constructor() {}
  async execute(query) {
    return [];
  }
}
