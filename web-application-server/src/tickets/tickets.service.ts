import { Injectable } from '@nestjs/common';
import { TicketsInfoDto } from './dto/ticketsinfo.dto';
import axios from 'axios';

@Injectable()
export class TicketsService {
  
  async getTicketsList( ticketsInfoDto: TicketsInfoDto): Promise<Array<any>> {
    // TODO 
    const response = await axios({
      url: process.env.SPIDER_HOST,
      method: 'GET',
      params: {
        ...ticketsInfoDto,
      },
    });

    const flightInfo: Array<any> = response.data;

    return flightInfo;
  }
}
