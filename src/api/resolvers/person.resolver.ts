import { Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { GetMostOftenNameQuery } from 'src/domain/queries';
import { Person } from '../models/person.model';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly queryBus: QueryBus) {}

  // @Query(() => Film)
  // async film(@Args('id', { type: () => Int }) id: number): Promise<Film> {
  //   return this.queryBus.execute(new GetFilmByIdQuery(id));
  // }

  // @Query(() => [Film])
  // async films(
  //   @Args('page', { type: () => Int }) page: number,
  // ): Promise<Film[]> {
  //   return this.queryBus.execute(new GetPaginatedFilmsQuery(page));
  // }

  @Query(() => [String])
  async mostOftenName(): Promise<string[]> {
    return this.queryBus.execute(new GetMostOftenNameQuery());
  }
}
