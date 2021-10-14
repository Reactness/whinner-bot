import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { CoreModule } from './core/core.module';

@Module({
  imports: [ConfigModule.forRoot(),TelegramModule, DatabaseModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
