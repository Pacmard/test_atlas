import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getBusInfo/:id')
  public async deleteItemBids(
    @Param('id') busId: number,
  ): Promise<any> {
    return this.appService.getBusInfo(busId);
  }
}