import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringTicketDto } from './dto/monitoringTicket.dto';


@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Post('/register')
  async registerMonitoringTicket(@Body() monitoringTicketDto: MonitoringTicketDto): Promise<void> {
    await this.monitoringService.postToMonitoring(monitoringTicketDto);
  }

  @Delete('/delete/:request_id')
  async deleteMonitoringTicket(@Param('request_id') request_id: string): Promise<void>{
    console.log('Deleting monitoring with request_id:', request_id);
    return this.monitoringService.deleteMonitoring(request_id);
  }

  @Get('/list')
  async getMonitoringList() {
    return this.monitoringService.getList();
  }
}
