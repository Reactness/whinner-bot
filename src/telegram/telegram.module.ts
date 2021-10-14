import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from "nestjs-telegraf";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { CoreModule } from "../core/core.module";

@Module({
  imports: [CoreModule, ScheduleModule.forRoot(),TelegrafModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      token: configService.get('TELEGRAM_BOT_TOKEN')
    }),
    inject: [ConfigService]
  })],
  providers: [TelegramService],
})
export class TelegramModule {}
