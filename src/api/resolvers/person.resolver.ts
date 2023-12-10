import { Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { GetMostOftenNameQuery } from 'src/domain/queries';

@Resolver(() => String)
export class PersonResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [String])
  async mostOftenName(): Promise<string[]> {
    return this.queryBus.execute(new GetMostOftenNameQuery());
  }
}
