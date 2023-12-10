import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaginatedSpeciesQuery } from './get-paginated-species.query';
import { SpeciesApiService } from 'src/services/external-api';
import { CacheService } from 'src/services/persistence';
import { Species } from 'src/models';

@QueryHandler(GetPaginatedSpeciesQuery)
export class GetPaginatedSpeciesQueryHandler
  implements IQueryHandler<GetPaginatedSpeciesQuery>
{
  constructor(
    private readonly speciesApiService: SpeciesApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(query: GetPaginatedSpeciesQuery): Promise<Species[]> {
    const { page } = query;

    return this.cacheService.manageCache<Species[]>(
      `GetPaginatedVehiclesQuery-${page}`,
      () => this.speciesApiService.getPaginatedSpecies(page),
    );
  }
}
