import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  GetPaginatedFilmsQueryHandler,
  GetFilmByIdQueryHandler,
  GetUniqueWordsQueryHandler,
  GetMostOftenNameQueryHandler,
  GetPlanetByIdQueryHandler,
  GetPaginatedPlanetsQueryHandler,
  GetSpeciesByIdQueryHandler,
  GetPaginatedSpeciesQueryHandler,
  GetStarshipByIdQueryHandler,
  GetPaginatedStarshipQueryHandler,
  GetVehicleByIdQueryHandler,
  GetPaginatedVehiclesQueryHandler,
} from './queries';
import { ServicesModule } from 'src/services/services.module';

export const QueryHandlers = [
  GetPaginatedFilmsQueryHandler,
  GetFilmByIdQueryHandler,
  GetUniqueWordsQueryHandler,
  GetMostOftenNameQueryHandler,
  GetPlanetByIdQueryHandler,
  GetPaginatedPlanetsQueryHandler,
  GetSpeciesByIdQueryHandler,
  GetPaginatedSpeciesQueryHandler,
  GetStarshipByIdQueryHandler,
  GetPaginatedStarshipQueryHandler,
  GetVehicleByIdQueryHandler,
  GetPaginatedVehiclesQueryHandler,
];

@Module({
  imports: [CqrsModule, ServicesModule],
  providers: [...QueryHandlers],
  exports: [...QueryHandlers],
})
export class DomainModule {}
