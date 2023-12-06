import { registerEnumType } from '@nestjs/graphql';

export enum EnumLoginMethod {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  WEIBO = 'WEIBO',
  TWITTER = 'TWITTER',
  LINE = 'LINE',
  MICROSOFT = 'MICROSOFT',
  LINKEDIN = 'LINKEDIN',
  AMAZON = 'AMAZON',
  WECHAT = 'WECHAT',
}

registerEnumType(EnumLoginMethod, {
  name: 'EnumLoginMethod',
});
