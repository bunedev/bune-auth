import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
class LoginInput {
  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail(
    {},
    {
      message: 'Must be email',
      context: {
        errorCode: 1004,
        developerNote: 'Must be email',
      },
    },
  )
  email: string;

  @Field()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, {
    message: 'EIC code must be at least 8 characters',
    context: {
      errorCode: 1003,
      developerNote: 'The validated string must contain 8 or more characters.',
    },
  })
  password: string;
}

export { LoginInput as LoginInput };
