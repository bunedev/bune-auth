import { InputType, Field, Boolean } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsDate,
} from 'class-validator';

@InputType()
class CreateUserInput {
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
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate({ message: 'Date of Birth must be a valid date' })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;

  @Field()
  @IsNotEmpty({ message: 'Role ID is required' })
  @IsString({ message: 'Role ID must be a string' })
  roleId?: string;

  @Field()
  @IsNotEmpty({ message: 'Status is required' })
  @IsString({ message: 'Status must be a string' })
  status?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'Two Factor Enabled must be a boolean' })
  twoFactorEnabled?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'Email Verified must be a boolean' })
  emailVerified?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate({ message: 'Last Login must be a valid date' })
  lastLogin?: Date;

  @Field()
  @IsNotEmpty({ message: 'Login Method is required' })
  @IsString({ message: 'Login Method must be a string' })
  loginMethod: string;
}

export { CreateUserInput as CreateUserInput };
