import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from "@nestjs/config";
import { CoreModule } from './core/core.module';
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [ConfigModule.forRoot(),TelegramModule, PrismaModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
