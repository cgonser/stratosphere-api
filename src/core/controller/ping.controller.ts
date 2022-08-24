import { Controller, Get, Post } from '@nestjs/common';

@Controller('ping')
export class PingController {
  @Get()
  @Post()
  async ping() {
    return 'pong';
  }
}
