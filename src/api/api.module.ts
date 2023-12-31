import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  FilmsResolver,
  PersonResolver,
  PlanetResolver,
  StarshipResolver,
  VehicleResolver,
  SpeciesResolver,
} from './resolvers';
import { DomainModule } from 'src/domain/domain.module';
import { CqrsModule } from '@nestjs/cqrs';

const Resolvers = [
  FilmsResolver,
  PersonResolver,
  PlanetResolver,
  StarshipResolver,
  VehicleResolver,
  SpeciesResolver,
];

@Module({
  imports: [
    CqrsModule,
    DomainModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  providers: [...Resolvers],
})
export class ApiModule {}
