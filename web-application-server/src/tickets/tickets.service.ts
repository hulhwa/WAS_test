import { Injectable } from '@nestjs/common';
import { TicketsDto } from './dto/tickets.dto';
import axios from 'axios';

const sampleData = [
  {
    stopover: [
      {
        airline: "ASIANA AIRLINES",
        flightNumber: "OZ0108",
        departureDate: new Date("2023-01-01T18:30:00"),
        destinationDate: new Date("2023-01-01T19:30:00"),
        price: 320700,
        departure: "인천국제공항",
        destination: "오사카",
        link: "https://www.asianaairlines.com",
        isSoldOut: false
      },
      {
        airline: "ASIANA AIRLINES",
        flightNumber: "OZ0110",
        departureDate: new Date("2023-01-01T20:00:00"),
        destinationDate: new Date("2023-01-01T21:00:00"),
        price: 200000,
        departure: "오사카",
        destination: "도쿄 나리타",
        isSoldOut: false
      }
    ]
  }
];

@Injectable()
export class TicketsService {
  
  async getTicketsList(ticketsDto: TicketsDto): Promise<Array<any>> {
    try {
      const response = await axios({
        url: process.env.SPIDER_HOST,
        method: 'GET',
        params: {
          ...ticketsDto,
        },
        timeout: 4000,
      });

      const flightInfo: Array<any> = response.data;
      return flightInfo;
    } catch (error) { //현재는 스파이더봇과 통신이 안되므로 샘플데이터보냄
      console.error('Error or timeout in fetching data:', error.message);
      return sampleData;
    }
  }
}