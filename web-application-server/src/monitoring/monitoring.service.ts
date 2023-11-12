import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MonitoringTicketDto } from './dto/monitoringTicket.dto';
import { MonitoringDocument } from './monitoring.model';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectModel('Monitoring') private monitoringModel: Model<MonitoringDocument>
  ) {}

  async postToMonitoring(monitoringTicketDto: MonitoringTicketDto): Promise<MonitoringDocument> {
    const requestId = uuidv4();
    const monitoringData = {
      ...monitoringTicketDto,
      requestId,
    };

    return new this.monitoringModel(monitoringData).save();
  }

}
