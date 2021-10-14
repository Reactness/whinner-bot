import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { GraphQLModule } from "@nestjs/graphql";
import { CoreResolver } from "./core.resolver";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: true
  }), PrismaModule],
  providers: [CoreService, CoreResolver],
  exports: [CoreService]
})
export class CoreModule {}
