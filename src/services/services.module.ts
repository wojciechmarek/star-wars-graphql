import { Module } from '@nestjs/common';
import { FilmApiService } from './external-api';

const ExternalApiServices = [FilmApiService];

@Module({
  providers: [...ExternalApiServices],
  exports: [...ExternalApiServices],
})
export class ServicesModule {}
