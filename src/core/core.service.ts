import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CoreService {
  constructor(private prisma: PrismaService) {
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async create(input: User): Promise<User> {
    return await this.prisma.user.create({data: input});
  }
}
