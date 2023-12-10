import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Film } from '../models';

@Resolver()
export class FilmsResolver {
  @Query(() => Film)
  async film(@Args('id', { type: () => Int }) id: number) {
    return new Film();
  }

  @Query(() => [Film])
  async films(@Args('page', { type: () => Int }) page: number) {
    return new Array<Film>();
  }

  @Query(() => String)
  async uniqueWords() {
    return 'Hello World!';
  }
}
