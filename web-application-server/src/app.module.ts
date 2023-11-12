import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsModule } from './tickets/tickets.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/dkdb'),
    TicketsModule,
    MonitoringModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
