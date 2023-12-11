import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetVehicleByIdQuery,
  GetPaginatedVehiclesQuery,
} from 'src/domain/queries';
import { Vehicle } from '../models/vehicle';

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => Vehicle)
  async vehicle(@Args('id', { type: () => Int }) id: number): Promise<Vehicle> {
    return this.queryBus.execute(new GetVehicleByIdQuery(id));
  }

  @Query(() => [Vehicle])
  async allVehicles(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  ): Promise<Vehicle[]> {
    return this.queryBus.execute(new GetPaginatedVehiclesQuery(page));
  }
}
