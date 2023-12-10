import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaginatedStarshipQuery } from './get-paginated-starships.query';
import { StarshipApiService } from 'src/services/external-api';
import { CacheService } from 'src/services/persistence';
import { Starship } from 'src/models';

@QueryHandler(GetPaginatedStarshipQuery)
export class GetPaginatedStarshipQueryHandler
  implements IQueryHandler<GetPaginatedStarshipQuery>
{
  constructor(
    private readonly starshipApiService: StarshipApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(query: GetPaginatedStarshipQuery): Promise<Starship[]> {
    const { page } = query;

    return this.cacheService.manageCache<Starship[]>(
      `GetPaginatedStarshipQuery-${page}`,
      () => this.starshipApiService.getPaginatedStarship(page),
    );
  }
}
