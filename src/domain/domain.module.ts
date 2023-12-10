import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  GetPaginatedFilmsQueryHandler,
  GetFilmByIdQueryHandler,
  GetUniqueWordsQueryHandler,
} from './queries';
import { ServicesModule } from 'src/services/services.module';

export const QueryHandlers = [
  GetPaginatedFilmsQueryHandler,
  GetFilmByIdQueryHandler,
  GetUniqueWordsQueryHandler,
];

@Module({
  imports: [CqrsModule, ServicesModule],
  providers: [...QueryHandlers],
  exports: [...QueryHandlers],
})
export class DomainModule {}
