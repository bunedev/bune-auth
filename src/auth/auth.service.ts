import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupArgs } from './base/args/SignupArgs';
import { User, UserStatus } from '@prisma/client';
import { RoleKeyDefault } from 'src/common/constants/app';
import { ErrorCodes, ErrorMessages } from 'src/common/constants/errors';
import { createGraphQLError } from 'bune-common';

@Injectable()
export class AuthService {
  constructor(protected readonly prisma: PrismaService) {}

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
    const roleUser = await this.prisma.role.findFirst({
      where: {
        key: RoleKeyDefault.USER,
      },
    });
    console.log('roleUser', roleUser);
    if (!roleUser) {
      throw createGraphQLError(
        HttpStatus.BAD_REQUEST,
        ErrorMessages.RoleNotFound,
        ErrorCodes.RoleNotFound,
      );
    }
    // check existed
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (user) {
      throw createGraphQLError(
        HttpStatus.BAD_REQUEST,
        ErrorMessages.UserExisted,
        ErrorCodes.UserExisted,
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
