import { Controller, Delete, Get, Post, Req, Res, Body } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringTicketDto } from './dto/monitoringTicket.dto';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Post('/register')
  async registerMonitoringTicket(
    @Body() monitoringTicketDto: MonitoringTicketDto,
  ): Promise<void> {
    this.monitoringService.postToMonitoring(monitoringTicketDto);

    return;
  }

  @Delete('/delete')
  async deleteMonitoringTicket(@Req req: Request, @Res res: Response): Promise<void> {
    // TODO
    const { airlane, departure, destination, departuredate } = req.body;

    this.monitoringService.removeToMonitroing();
    return;
  }

  @Get('/list')
  async getMonitoringTicket(@Req req: Request, @Res res: Response): Promise<Array<>> {
    // TODO
    const { userid } = req.body;

    const monitoringTickets = await this.monitoringService.getMonitoringTickets(userid);
    return monitoringTickets;
  }
}
