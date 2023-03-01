import { Controller, Get, Req, Res, Query } from '@nestjs/common';
import { AppService, QueryType } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/AccessKeylist")
  async listAWSIAM(@Query() q: QueryType): Promise<any> {
    if (q?.period && !Number(q?.period)) {
      return "period 값은 숫자만 입력해야 합니다."
    }
    return await this.appService.getAWSOldAccesskey(q)
  }
}
