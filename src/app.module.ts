import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { DomainModule } from './domain/domain.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [ApiModule, DomainModule, ServicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
