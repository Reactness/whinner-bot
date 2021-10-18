import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User as TelegramUser } from "typegram";
import { User } from "../prisma/models";


@Injectable()
export class CoreService {
  constructor(private prisma: PrismaService) {
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async createUser(input: User): Promise<User> {
    return await this.prisma.user.upsert({
      update: input,
      create: input,
      where: {
        telegramId: input.telegramId
      }
      }
    )
    }


  async processMessage(user: TelegramUser, message: string, response: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        telegramId: user.id
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

  async getChats(): Promise<string[]> {
    const chats = await this.prisma.user.findMany({
      select: {
        chatId: true
      }
    });
    return chats.map(chat => chat.chatId);
  }
}
