import { Controller, Post } from '@nestjs/common';
import { DataFetcherService } from './data-fetcher.service';

@Controller('data-fetcher')
export class DataFetcherController {
    constructor(private readonly dataFetcherService: DataFetcherService) {}

    @Post('/toggle-monitoring')
    toggleMonitoring() {
      return this.dataFetcherService.toggleMonitoring();
    }
}
