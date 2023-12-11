import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetSpeciesByIdQuery,
  GetPaginatedSpeciesQuery,
} from 'src/domain/queries';
import { Species } from '../models/species';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => Species)
  async species(@Args('id', { type: () => Int }) id: number): Promise<Species> {
    return this.queryBus.execute(new GetSpeciesByIdQuery(id));
  }

  @Query(() => [Species])
  async allSpecies(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  ): Promise<Species[]> {
    return this.queryBus.execute(new GetPaginatedSpeciesQuery(page));
  }
}
