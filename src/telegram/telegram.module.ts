import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TelegrafModule } from "nestjs-telegraf";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot(),TelegrafModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      token: configService.get('TELEGRAM_BOT_TOKEN')
    }),
    inject: [ConfigService]
  })],
  providers: [TelegramService],
  controllers: [TelegramController]
})
export class TelegramModule {}
