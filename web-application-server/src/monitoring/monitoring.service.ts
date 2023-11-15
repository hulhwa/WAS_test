import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MonitoringTicketDto } from './dto/monitoringTicket.dto';
import { MonitoringDocument } from './monitoring.model';
import axios from 'axios';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectModel('Monitoring') private monitoringModel: Model<MonitoringDocument>
  ) {}

  async postToMonitoring(monitoringTicketDto: MonitoringTicketDto): Promise<MonitoringDocument> {
    const request_id = uuidv4();
    const monitoringData = {
      ...monitoringTicketDto,
      request_id,
    };

    const savedDocument = new this.monitoringModel(monitoringData).save();

    // 모니터링 큐 서버에 데이터 전송
    /*
    try {
      await axios.post('모니터링 큐 서버 URL', { ...monitoringData });
    } catch (error) {
      console.error('Error sending data to monitoring queue server', error);
    }*/

    return savedDocument;
  }

  async deleteMonitoring(request_id: string): Promise<any> {
    const deleteResult = this.monitoringModel.deleteOne({ request_id }).exec();

    // 모니터링 큐 서버에 삭제 요청 전송
    /*
    try {
      await axios.post('모니터링 큐 서버 삭제 엔드포인트 URL', { request_id });
    } catch (error) {
      console.error('Error sending delete request to monitoring queue server', error);
    }
    */
   
    return deleteResult;
  }

  async getList() {
    return this.monitoringModel.find().exec();
  }
}
