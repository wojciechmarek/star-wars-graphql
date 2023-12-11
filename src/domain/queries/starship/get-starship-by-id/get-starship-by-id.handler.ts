import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetStarshipByIdQuery } from './get-starship-by-id.query';
import { StarshipApiService } from 'src/services/external-api';
import { CacheService } from 'src/services/persistence';
import { Starship } from 'src/models';

@QueryHandler(GetStarshipByIdQuery)
export class GetStarshipByIdQueryHandler
  implements IQueryHandler<GetStarshipByIdQuery>
{
  constructor(
    private readonly starshipApiService: StarshipApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(query: GetStarshipByIdQuery): Promise<Starship> {
    const { id } = query;
    return this.cacheService.manageCache<Starship>(
      `GetStarshipByIdQuery-${id}`,
      () => this.starshipApiService.getStarshipById(id),
    );
  }
}
