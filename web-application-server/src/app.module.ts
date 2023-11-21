import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsModule } from './tickets/tickets.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_HOST, {
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
      dbName: process.env.DB_NAME
    }),
    TicketsModule,
    MonitoringModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
