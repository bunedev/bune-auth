import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupArgs } from './base/args/SignupArgs';
import { User, UserStatus } from '@prisma/client';
import { RoleKeyDefault } from 'src/common/constants/app';
import { ErrorCodes, ErrorMessages } from 'bune-common';
import { createGraphQLError } from 'bune-common';
import { LoginArgs } from './base/args/LoginArgs';
import { BunUtils } from '../utils/bun';

@Injectable()
export class AuthService {
  constructor(protected readonly prisma: PrismaService) {}

  /**
   * Create a new user record with the provided arguments.
   *
   * @param args - The arguments used to create the user record.
   * @returns A Promise that resolves to the newly created user record.
   */
  async signup(args: SignupArgs): Promise<User> {
    const data = args.data;
    const passwordHash = await BunUtils.hashPassword(data.password);
    const username = data.email.split('@')[0];
    // get role id by role default for user
    const roleUser = await this.prisma.role.findFirst({
      where: {
        key: RoleKeyDefault.USER,
      },
    });
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

  /**
   * Login a user with the provided credentials.
   *
   * @param args - The arguments used for user login.
   * @returns A Promise that resolves to the logged-in user.
   */
  async login(args: LoginArgs): Promise<User> {
    const data = args.data;

    // Find the user by email
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    // Check if the user exists
    if (!user) {
      throw createGraphQLError(
        HttpStatus.BAD_REQUEST,
        ErrorMessages.UserNotFound,
        ErrorCodes.UserNotFound,
      );
    }

    const isPasswordValid = await BunUtils.verifyPassword(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw createGraphQLError(
        HttpStatus.UNAUTHORIZED,
        ErrorMessages.PasswordInvalid,
        ErrorCodes.PasswordInvalid,
      );
    }

    // Check if the user's status is active
    if (user.status !== UserStatus.ACTIVE) {
      throw createGraphQLError(
        HttpStatus.FORBIDDEN,
        ErrorMessages.UserNotActive,
        ErrorCodes.UserNotActive,
      );
    }

    return user;
  }
}
