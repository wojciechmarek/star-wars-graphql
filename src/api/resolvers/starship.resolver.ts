import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetStarshipByIdQuery,
  GetPaginatedStarshipQuery,
} from 'src/domain/queries';
import { Starship } from '../models/starship';

@Resolver(() => Starship)
export class StarshipResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => Starship)
  async starship(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Starship> {
    return this.queryBus.execute(new GetStarshipByIdQuery(id));
  }

  @Query(() => [Starship])
  async starships(
    @Args('page', { type: () => Int }) page: number,
  ): Promise<Starship[]> {
    return this.queryBus.execute(new GetPaginatedStarshipQuery(page));
  }
}
