import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
  IsISO8601,
} from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
class SignupInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(5, {
    message: 'Password length must be greater than 8 characters',
    context: {
      code: 10000,
    },
  })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'Code is required' })
  code: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsISO8601({}, { message: 'Date of Birth must be in the format YYYY-MM-DD' })
  dateOfBirth?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;
}

export { SignupInput as SignupInput };
