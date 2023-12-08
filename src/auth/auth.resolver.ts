import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { SignupArgs } from '../auth/base/args/SignupArgs';
import { User } from 'src/users/user';
import { AuthService } from './auth.service';
import { LoginArgs } from './base/args/LoginArgs';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signup(@Args() args: SignupArgs): Promise<User> {
    return await this.authService.signup(args);
  }

  @Mutation(() => User)
  async login(@Args() args: LoginArgs): Promise<User> {
    return await this.authService.login(args);
  }
}
