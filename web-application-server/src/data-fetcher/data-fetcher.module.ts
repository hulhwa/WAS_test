import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataFetcherService } from './data-fetcher.service';
import { DataFetcherController } from './data-fetcher.controller';
import { MonitoringSchema } from '../monitoring/monitoring.model';
import { MonitoringResultSchema } from '../monitoring/monitoringResult.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Monitoring', schema: MonitoringSchema },
      { name: 'MonitoringResult', schema: MonitoringResultSchema }
    ]),
  ],
  providers: [DataFetcherService],
  controllers: [DataFetcherController]
})
export class DataFetcherModule {}
