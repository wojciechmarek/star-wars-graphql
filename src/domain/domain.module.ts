import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  GetPaginatedFilmsQueryHandler,
  GetFilmByIdQueryHandler,
  GetUniqueWordsQueryHandler,
  GetMostOftenNameQueryHandler,
} from './queries';
import { ServicesModule } from 'src/services/services.module';

export const QueryHandlers = [
  GetPaginatedFilmsQueryHandler,
  GetFilmByIdQueryHandler,
  GetUniqueWordsQueryHandler,
  GetMostOftenNameQueryHandler,
];

@Module({
  imports: [CqrsModule, ServicesModule],
  providers: [...QueryHandlers],
  exports: [...QueryHandlers],
})
export class DomainModule {}
