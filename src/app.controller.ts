import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { getAccessKeylist } from './lib/aws'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/lists")
  async listAWSIAM(): Promise<any> {
    return await getAccessKeylist()
  }
}
