import { registerEnumType } from '@nestjs/graphql';

export enum EnumPermissionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEPRECATED = 'DEPRECATED',
  ARCHIVED = 'ARCHIVED',
}

registerEnumType(EnumPermissionStatus, {
  name: 'EnumPermissionStatus',
});
