import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaginatedVehiclesQuery } from './get-paginated-vehicles.query';
import { VehicleApiService } from 'src/services/external-api';
import { CacheService } from 'src/services/persistence';
import { Vehicle } from 'src/models';

@QueryHandler(GetPaginatedVehiclesQuery)
export class GetPaginatedVehiclesQueryHandler
  implements IQueryHandler<GetPaginatedVehiclesQuery>
{
  constructor(
    private readonly vehicleApiService: VehicleApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(query: GetPaginatedVehiclesQuery): Promise<Vehicle[]> {
    const { page } = query;

    return this.cacheService.manageCache<Vehicle[]>(
      `GetPaginatedVehiclesQuery-${page}`,
      () => this.vehicleApiService.getPaginatedVehicles(page),
    );
  }
}
