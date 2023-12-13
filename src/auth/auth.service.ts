import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupArgs } from './base/args/SignupArgs';
import { User, UserStatus } from '@prisma/client';
import { RoleKeyDefault } from 'src/common/constants/app';
import {
  CACHE_TTL,
  ErrorCodes,
  ErrorMessages,
  randomNumber,
} from 'bune-common';
import { createGraphQLError } from 'bune-common';
import { LoginArgs } from './base/args/LoginArgs';
import { BunUtils } from '../utils/bun';
import { SendOtpArgs } from './base/args/SendOtpInput';
import { RedisService } from 'src/redis/redis.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
  ) {}

  /**
   * Create a new user record with the provided arguments.
   *
   * @param args - The arguments used to create the user record.
   * @returns A Promise that resolves to the newly created user record.
   */
  async signup(args: SignupArgs): Promise<User> {
    const data = args.data;

    const code = await this.redisService.get(`signup_${data.email}`);
    if (code! || code != data.code) {
      throw createGraphQLError(
        HttpStatus.BAD_REQUEST,
        ErrorMessages.InvalidOTP,
        ErrorCodes.InvalidOTP,
      );
    }

    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

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

    if (user && user.status === UserStatus.INACTIVE) {
      return this.prisma.user.update({
        where: {
          id: user.id,
        },
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
          dateOfBirth: new Date(data.dateOfBirth),
        },
      });
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
        dateOfBirth: new Date(data.dateOfBirth),
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
    if (!user || (user && user.status === UserStatus.INACTIVE)) {
      throw createGraphQLError(
        HttpStatus.UNAUTHORIZED,
        ErrorMessages.AccountNotRegister,
        ErrorCodes.AccountNotRegister,
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

    // Check the user status and handle different cases
    switch (user.status) {
      case UserStatus.SUSPENDED:
        throw createGraphQLError(
          HttpStatus.UNAUTHORIZED,
          ErrorMessages.UserSuspended,
          ErrorCodes.UserSuspended,
        );
      case UserStatus.LOCKED:
        throw createGraphQLError(
          HttpStatus.UNAUTHORIZED,
          ErrorMessages.UserLocked,
          ErrorCodes.UserLocked,
        );
      case UserStatus.CLOSED:
        throw createGraphQLError(
          HttpStatus.UNAUTHORIZED,
          ErrorMessages.UserClosed,
          ErrorCodes.UserClosed,
        );
      case UserStatus.ARCHIVED:
        throw createGraphQLError(
          HttpStatus.UNAUTHORIZED,
          ErrorMessages.UserArchived,
          ErrorCodes.UserArchived,
        );
    }
    //  update last login time
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    return user;
  }

  async sendOTP(args: SendOtpArgs): Promise<boolean> {
    const data = args.data;
    const code = randomNumber(6);
    await this.redisService.set(
      `signup_${data.email}`,
      code,
      CACHE_TTL.FIVE_MINUTES,
    );
    await this.mailService.userRegister({
      data: {
        code: code.toString(),
        subject: `Register Account`,
      },
      to: data.email,
    });
    return true;
  }
}
