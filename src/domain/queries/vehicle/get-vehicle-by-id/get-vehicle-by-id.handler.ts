import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetVehicleByIdQuery } from './get-vehicle-by-id.query';
import { VehicleApiService } from 'src/services/external-api';
import { Vehicle } from 'src/api/models';
import { CacheService } from 'src/services/persistence';

@QueryHandler(GetVehicleByIdQuery)
export class GetVehicleByIdQueryHandler
  implements IQueryHandler<GetVehicleByIdQuery>
{
  constructor(
    private readonly vehicleApiService: VehicleApiService,
    private readonly cacheService: CacheService,
  ) {}
  async execute(query: GetVehicleByIdQuery): Promise<Vehicle> {
    const { id } = query;
    return this.cacheService.manageCache<Vehicle>(
      `GetVehicleByIdQuery-${id}`,
      () => this.vehicleApiService.getVehicleById(id),
    );
  }
}
