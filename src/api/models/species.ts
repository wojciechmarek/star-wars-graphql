import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Species {
  @Field()
  title: string;

  @Field()
  episode_id: string;

  @Field()
  opening_crawl: string;

  @Field()
  director: string;

  @Field()
  producer: string;

  @Field()
  release_date: string;

  @Field(() => [String])
  characters: string[];

  @Field(() => [String])
  planets: string[];

  @Field(() => [String])
  starships: string[];

  @Field(() => [String])
  vehicles: string[];

  @Field(() => [String])
  species: string[];

  @Field()
  created: string;

  @Field()
  edited: string;

  @Field()
  url: string;
}
