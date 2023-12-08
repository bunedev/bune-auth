import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  Length,
  MinLength,
} from 'class-validator';

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

  @Field({ nullable: true })
  @IsOptional()
  @IsDate({ message: 'Date of Birth must be a valid date' })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;
}

export { SignupInput as SignupInput };
