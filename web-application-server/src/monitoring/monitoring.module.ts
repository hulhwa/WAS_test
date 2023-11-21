import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonitoringService } from './monitoring.service';
import { MonitoringController } from './monitoring.controller';
import { MonitoringModel, MonitoringSchema } from './monitoring.model';
import { MonitoringResultSchema } from './monitoringResult.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Monitoring', schema: MonitoringSchema },
      { name: 'MonitoringResult', schema: MonitoringResultSchema }
    ]),
  ],
  providers: [MonitoringService],
  controllers: [MonitoringController],
})
export class MonitoringModule {}
