import { Module } from '@nestjs/common';
import { FilmApiService } from './external-api';
import { CacheService, PrismaService } from './persistence';

const ExternalApiServices = [FilmApiService];
const PersistenceServices = [CacheService, PrismaService];

@Module({
  providers: [...ExternalApiServices, ...PersistenceServices],
  exports: [...ExternalApiServices, ...PersistenceServices],
})
export class ServicesModule {}
