import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/roles/role';
import { EnumPermissionStatus } from './base/enums/EnumPermissionStatus';

@ObjectType()
@Directive('@key(fields: "id")')
export class Permission {
  @Field(() => ID)
  id: string;

  @Field()
  action: string;

  @Field()
  subject: string;

  @Field()
  inverted: boolean;

  @Field(() => JSON, { nullable: true })
  conditions?: JSON;

  @Field({ nullable: true })
  reason?: string;

  @Field()
  status: EnumPermissionStatus;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Role], { nullable: true })
  roles?: Role[];
}
