import { ArgsType, Field } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SendOtpInput } from '../input/SendOtpInput';

@ArgsType()
class SendOtpArgs {
  @ValidateNested()
  @Type(() => SendOtpInput)
  @Field(() => SendOtpInput, { nullable: false })
  data!: SendOtpInput;
}

export { SendOtpArgs as SendOtpArgs };
