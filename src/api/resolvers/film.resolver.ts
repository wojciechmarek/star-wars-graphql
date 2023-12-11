import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetFilmByIdQuery,
  GetPaginatedFilmsQuery,
  GetUniqueWordsQuery,
} from 'src/domain/queries';
import { Film } from '../models/film';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => Film)
  async film(@Args('id', { type: () => Int }) id: number): Promise<Film> {
    return this.queryBus.execute(new GetFilmByIdQuery(id));
  }

  @Query(() => [Film])
  async allFilms(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  ): Promise<Film[]> {
    return this.queryBus.execute(new GetPaginatedFilmsQuery(page));
  }

  @Query(() => String)
  async uniqueWords(): Promise<string> {
    return this.queryBus.execute(new GetUniqueWordsQuery());
  }
}
