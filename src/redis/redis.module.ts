import { Module } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

@Module({
  providers: [
    {
      provide: 'REDIS_CONNECTION',
      useFactory: () => {
        return new Redis({
          host: Bun.env.REDIS_HOST,
          port: +Bun.env.REDIS_PORT,
          password: Bun.env.REDIS_PASSWORD,
          db: +Bun.env.REDIS_DB,
          keyPrefix: Bun.env.REDIS_PREFIX,
        });
      },
      inject: [],
    },

    RedisService,
  ],
  exports: ['REDIS_CONNECTION', RedisService],
})
export class RedisModule {}
