import { Body, Controller, Get } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsDto } from './dto/tickets.dto';
import { TicketsInfoDto } from './dto/ticketsinfo.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('/list')
  async getTickets(@Body() ticketsDto: TicketsDto,): Promise<Array<TicketsInfoDto>> {
    return this.ticketsService.getTicketsList(ticketsDto);
  }
}
