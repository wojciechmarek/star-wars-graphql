import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpeciesByIdQuery } from './get-species-by-id.query';
import { SpeciesApiService } from 'src/services/external-api';
import { CacheService } from 'src/services/persistence';
import { Species } from 'src/models';

@QueryHandler(GetSpeciesByIdQuery)
export class GetSpeciesByIdQueryHandler
  implements IQueryHandler<GetSpeciesByIdQuery>
{
  constructor(
    private readonly speciesApiService: SpeciesApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(query: GetSpeciesByIdQuery): Promise<Species> {
    const { id } = query;
    return this.cacheService.manageCache<Species>(
      `GetSpeciesByIdQuery-${id}`,
      () => this.speciesApiService.getSpeciesById(id),
    );
  }
}
