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

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signup(@Args() args: SignupArgs): Promise<User> {
    return await this.authService.create(args);
  }
}
