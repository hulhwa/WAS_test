import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MonitoringService } from './monitoring.service';
import { MonitoringController } from './monitoring.controller';
import { MonitoringModel, MonitoringSchema } from './monitoring.model';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Monitoring', schema: MonitoringSchema}]),
  ],
  controllers: [MonitoringController],
  providers: [MonitoringService]
})
export class MonitoringModule {}
