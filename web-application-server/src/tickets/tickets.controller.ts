import { Body, Controller, Get } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsInfoDto } from './dto/ticketsinfo.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('/list')
  async getTickets(@Body() ticketsInfoDto: TicketsInfoDto): Promise<Array<TicketsInfoDto>> {
    return this.ticketsService.getTicketsList(ticketsInfoDto);
  }
}
