import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
class SendOtpInput {
  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;
}

export { SendOtpInput as SendOtpInput };
