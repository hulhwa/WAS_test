import { Controller, Delete, Get, Post, Body } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringTicketDto } from './dto/monitoringTicket.dto';


@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Post('/register')
  async registerMonitoringTicket(@Body() monitoringTicketDto: MonitoringTicketDto): Promise<void> {
    await this.monitoringService.postToMonitoring(monitoringTicketDto);
  }
}
