import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { TicketsController } from './tickets/tickets.controller';
import { TicketsService } from './tickets/tickets.service';
import { MonitoringModule } from './monitoring/monitoring.module';

@Module({
  imports: [TicketsModule, MonitoringModule],
  controllers: [AppController, TicketsController],
  providers: [AppService, TicketsService],
})
export class AppModule {}
