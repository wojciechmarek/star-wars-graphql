import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Film } from '../models';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetFilmByIdQuery,
  GetPaginatedFilmsQuery,
  GetUniqueWordsQuery,
} from 'src/domain/queries';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => Film)
  async film(@Args('id', { type: () => Int }) id: number): Promise<Film> {
    return this.queryBus.execute(new GetFilmByIdQuery(id));
  }

  @Query(() => [Film])
  async films(
    @Args('page', { type: () => Int }) page: number,
  ): Promise<Film[]> {
    return this.queryBus.execute(new GetPaginatedFilmsQuery(page));
  }

  @Query(() => String)
  async uniqueWords(): Promise<string> {
    return this.queryBus.execute(new GetUniqueWordsQuery());
  }
}
