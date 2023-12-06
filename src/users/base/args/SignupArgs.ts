import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SignupInput } from '../input/SignupInput';

@ArgsType()
class SignupArgs {
  @ValidateNested()
  @Type(() => SignupInput)
  @Field(() => SignupInput, { nullable: false })
  data!: SignupInput;
}

export { SignupArgs as SignupArgs };
