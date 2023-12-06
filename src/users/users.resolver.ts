import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { User } from './user';
import { UsersService } from './users.service';
import { SignupArgs } from './base/args/SignupArgs';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  getUser(@Args('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  // Mutation to create a new payment transaction
  @Mutation(() => User)
  async signup(@Args() args: SignupArgs): Promise<User> {
    return await this.usersService.create(args);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<User> {
    return this.usersService.findById(reference.id);
  }
}
