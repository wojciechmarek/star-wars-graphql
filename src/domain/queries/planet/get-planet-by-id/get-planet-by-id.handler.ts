import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPlanetByIdQuery } from './get-planet-by-id.query';
import { PlanetApiService } from 'src/services/external-api';
import { CacheService } from 'src/services/persistence';
import { Planet } from 'src/models';

@QueryHandler(GetPlanetByIdQuery)
export class GetPlanetByIdQueryHandler
  implements IQueryHandler<GetPlanetByIdQuery>
{
  constructor(
    private readonly planetApiService: PlanetApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(query: GetPlanetByIdQuery): Promise<Planet> {
    const { id } = query;

    return this.cacheService.manageCache<Planet>(
      `GetPaginatedPlanetsQuery-${id}`,
      () => this.planetApiService.getPlanetById(id),
    );
  }
}
