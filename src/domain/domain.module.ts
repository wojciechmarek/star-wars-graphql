import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import {
  GetPaginatedFilmsQueryHandler,
  GetFilmByIdQueryHandler,
  GetUniqueWordsQueryHandler,
} from './queries';

export const QueryHandlers = [
  GetPaginatedFilmsQueryHandler,
  GetFilmByIdQueryHandler,
  GetUniqueWordsQueryHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...QueryHandlers],
  exports: [...QueryHandlers],
})
export class DomainModule {}
