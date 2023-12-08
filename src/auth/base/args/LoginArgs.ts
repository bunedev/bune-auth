import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LoginInput } from '../input/LoginInput';

@ArgsType()
class LoginArgs {
  @ValidateNested()
  @Type(() => LoginInput)
  @Field(() => LoginInput, { nullable: false })
  data!: LoginInput;
}

export { LoginArgs as LoginArgs };
