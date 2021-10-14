import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./models/user.entity";

@Module({
  imports: [SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      dialect: 'postgres',
      host: configService.get('HOST'),
      port: +configService.get('PORT'),
      username: configService.get('USERNAME'),
      password: configService.get('PASSWORD'),
      database: configService.get('DATABASE'),
      models: [User],
    }),
    inject: [ConfigService],
  })
  ],
})
export class DatabaseModule {}
