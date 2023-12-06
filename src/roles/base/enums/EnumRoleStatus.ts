import { registerEnumType } from '@nestjs/graphql';

export enum EnumRoleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEPRECATED = 'DEPRECATED',
  LOCKED = 'LOCKED',
  ARCHIVED = 'ARCHIVED',
}

registerEnumType(EnumRoleStatus, {
  name: 'EnumRoleStatus',
});
