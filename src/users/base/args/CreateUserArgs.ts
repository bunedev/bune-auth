import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserInput } from '../input/CreateUserInput';

@ArgsType()
class CreateUserArgs {
  @ValidateNested()
  @Type(() => CreateUserInput)
  @Field(() => CreateUserInput, { nullable: false })
  data!: CreateUserInput;
}

export { CreateUserArgs as CreateUserArgs };
