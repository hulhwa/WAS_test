import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsModule } from './tickets/tickets.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataFetcherModule } from './data-fetcher/data-fetcher.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://dk_123:dk_db@localhost:27017/dkdb'
    ),
    TicketsModule,
    MonitoringModule,
    DataFetcherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
