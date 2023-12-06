import { registerEnumType } from '@nestjs/graphql';

export enum EnumUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  LOCKED = 'LOCKED',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

registerEnumType(EnumUserStatus, {
  name: 'EnumUserStatus',
});
