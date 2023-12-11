import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetPlanetByIdQuery,
  GetPaginatedPlanetsQuery,
} from 'src/domain/queries';
import { Planet } from '../models/planet';

@Resolver(() => Planet)
export class PlanetResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => Planet)
  async planet(@Args('id', { type: () => Int }) id: number): Promise<Planet> {
    return this.queryBus.execute(new GetPlanetByIdQuery(id));
  }

  @Query(() => [Planet])
  async allPlanets(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  ): Promise<Planet[]> {
    return this.queryBus.execute(new GetPaginatedPlanetsQuery(page));
  }
}
