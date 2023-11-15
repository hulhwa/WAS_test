import { Body, Controller, Get, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsDto } from './dto/tickets.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('/list')
  async getTickets(@Query() ticketsDto: TicketsDto): Promise<Array<TicketsDto>> {
    return this.ticketsService.getTicketsList(ticketsDto);
  }
}
