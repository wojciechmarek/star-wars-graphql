import { Module } from '@nestjs/common';
import {
  FilmApiService,
  PersonApiService,
  PlanetApiService,
  SpeciesApiService,
  StarshipApiService,
  VehicleApiService,
} from './external-api';
import { CacheService, PrismaService } from './persistence';

const ExternalApiServices = [
  FilmApiService,
  PersonApiService,
  PlanetApiService,
  SpeciesApiService,
  StarshipApiService,
  VehicleApiService,
];
const PersistenceServices = [CacheService, PrismaService];

@Module({
  providers: [...ExternalApiServices, ...PersistenceServices],
  exports: [...ExternalApiServices, ...PersistenceServices],
})
export class ServicesModule {}
