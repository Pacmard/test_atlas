import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getBusInfo/:id/:date')
  public async deleteItemBids(
    @Param('id') busId: number,
    @Param('date') date: Date,
  ): Promise<any> {
    return this.appService.getBusInfo(busId, date);
  }
}
