import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FilmsResolver, PersonResolver } from './resolvers';
import { DomainModule } from 'src/domain/domain.module';
import { CqrsModule } from '@nestjs/cqrs';

const Resolvers = [FilmsResolver, PersonResolver];

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
