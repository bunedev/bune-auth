import { Injectable } from '@nestjs/common';
import { User } from "../@generated/user/user.model"
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(protected readonly prisma: PrismaService) {}
  async findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } }) as any;
  }
}
