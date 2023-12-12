import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { EnumLoginMethod } from './base/enums/EnumLoginMethod';
import { EnumUserStatus } from './base/enums/EnumUserStatus';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field(() => Date, { nullable: true })
  dateOfBirth?: Date;

  @Field({ nullable: true })
  phone?: string;

  @Field(() => String, { nullable: false })
  roleId: string;

  @Field()
  status: EnumUserStatus;

  @Field({ nullable: true })
  twoFactorEnabled?: boolean;

  @Field({ nullable: true })
  emailVerified?: boolean;

  @Field(() => Date, { nullable: true })
  lastLogin?: Date;

  @Field()
  loginMethod: EnumLoginMethod;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
