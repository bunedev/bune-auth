import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { EnumRoleStatus } from './base/enums/EnumRoleStatus';
import { Permission } from 'src/permissions/permission';

@ObjectType()
@Directive('@key(fields: "id")')
export class Role {
  @Field(() => ID)
  id: string;

  @Field()
  key: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  status: EnumRoleStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Permission], { nullable: true })
  permissions?: Permission[];
}
