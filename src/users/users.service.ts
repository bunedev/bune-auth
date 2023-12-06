import { Injectable } from '@nestjs/common';
import { User } from './user';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserArgs } from './base/args/CreateUserArgs';
import { SignupArgs } from './base/args/SignupArgs';
import { RoleKeyDefault } from 'src/common/constants/app';
import { UserStatus } from '@prisma/client';
import { createGraphQLError } from '../../../bune-base/src/utils/graphql-errors.util';
import { ErrorCodes, ErrorMessages } from 'src/common/constants/errors';

@Injectable()
export class UsersService {
  constructor(protected readonly prisma: PrismaService) {}
  async findById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * Create a new user record with the provided arguments.
   *
   * @param args - The arguments used to create the user record.
   * @returns A Promise that resolves to the newly created user record.
   */
  async create(args: SignupArgs): Promise<User> {
    const data = args.data;
    const passwordHash = await Bun.password.hash(data.password, {
      algorithm: 'bcrypt',
      cost: 10, // number between 4-31
    });
    const username = data.email.split('@')[0];
    // get role id by role default for user
    const roleUser = await this.prisma.role.findUnique({
      where: {
        key: RoleKeyDefault.USER,
      },
    });
    if (!roleUser) {
      throw createGraphQLError(
        ErrorMessages.RoleNotFound,
        ErrorCodes.RoleNotFound,
      );
    }
    return this.prisma.user.create({
      data: {
        role: {
          connect: {
            id: roleUser.id,
          },
        },
        status: UserStatus.INACTIVE,
        passwordHash: passwordHash,
        username: username,
        phone: data.phone,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
      },
    });
  }
}
