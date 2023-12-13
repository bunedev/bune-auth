import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SignupArgs } from '../auth/base/args/SignupArgs';
import { User } from 'src/users/user';
import { AuthService } from './auth.service';
import { LoginArgs, SendOtpArgs } from './base/args';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signup(@Args() args: SignupArgs): Promise<User> {
    return (await this.authService.signup(args)) as any;
  }

  @Mutation(() => User)
  async login(@Args() args: LoginArgs): Promise<User> {
    return (await this.authService.login(args)) as any;
  }

  /**
   * Query to send an OTP (One-Time Password) to a user's mobile or email.
   *
   * @param args - The input arguments for sending OTP.
   * @returns `true` if the OTP is sent successfully, `false` otherwise.
   */
  @Query(() => Boolean)
  async sendOTP(@Args() args: SendOtpArgs): Promise<boolean> {
    return this.authService.sendOTP(args);
  }
}
