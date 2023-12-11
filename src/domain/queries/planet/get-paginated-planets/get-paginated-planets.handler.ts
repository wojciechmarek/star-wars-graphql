import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaginatedPlanetsQuery } from './get-paginated-planets.query';
import { PlanetApiService } from 'src/services/external-api';
import { CacheService } from 'src/services/persistence';
import { Planet } from 'src/models';

@QueryHandler(GetPaginatedPlanetsQuery)
export class GetPaginatedPlanetsQueryHandler
  implements IQueryHandler<GetPaginatedPlanetsQuery>
{
  constructor(
    private readonly planetApiService: PlanetApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(query: GetPaginatedPlanetsQuery): Promise<Planet[]> {
    const { page } = query;

    return this.cacheService.manageCache<Planet[]>(
      `GetPaginatedPlanetsQuery-${page}`,
      () => this.planetApiService.getPaginatedPlanets(page),
    );
  }
}
