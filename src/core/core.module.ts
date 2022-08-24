import { Module } from '@nestjs/common';
import {PingController} from "./controller/ping.controller";

@Module({
  controllers: [PingController],
})
export class CoreModule {}
