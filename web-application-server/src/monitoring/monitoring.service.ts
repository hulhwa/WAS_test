import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MonitoringTicketDto } from './dto/monitoringTicket.dto';
import { MonitoringDocument } from './monitoring.model';
import { MonitoringResultDocument } from './monitoringResult.model';
import axios from 'axios';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectModel('Monitoring') private monitoringModel: Model<MonitoringDocument>,
    @InjectModel('MonitoringResult') private monitoringResultModel: Model<MonitoringResultDocument>
  ) {}

  async postToMonitoring(monitoringTicketDto: MonitoringTicketDto): Promise<MonitoringDocument> {
    
    const request_id = uuidv4();
    const monitoringData = {
      ...monitoringTicketDto,
      request_id,
    };

    const savedDocument = new this.monitoringModel(monitoringData).save();

    return savedDocument;
  }

  async deleteMonitoring(request_id: string): Promise<any> {
    const deleteResult = this.monitoringModel.deleteOne({ request_id }).exec();
    const deleteMonitoringResults = this.monitoringResultModel.deleteOne({ request_id }).exec();
    await Promise.all([deleteResult, deleteMonitoringResults]); //둘다지움
    return deleteResult;
  }

  async getList() {
    return this.monitoringModel.find().exec();
  }

  async getMonitoringResultList(): Promise<MonitoringResultDocument[]> {
    return this.monitoringResultModel.find().exec();
  }
}
