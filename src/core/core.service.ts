import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from "../prisma/prisma.service";
import { User as TelegramUser } from 'typegram';


@Injectable()
export class CoreService {
  constructor(private prisma: PrismaService) {
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async createUser(input: User): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: {
        id: input.id
      }
    })
    if (existing) return
    await this.prisma.user.create({data: input});
  }

  async processMessage(user: TelegramUser, message: string, response: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        userName: user.username
      },
      data: {
        message: {
          create: {
            message: message,
            response: response,
          }
        }
      }
    })
  }
}
