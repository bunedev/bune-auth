import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CONNECTION') private readonly redisClient: Redis,
  ) {}

  public async set(key: string, value: any, ttl?: number): Promise<any> {
    if (ttl) {
      return await this.redisClient.set(key, value, 'EX', ttl);
    } else {
      return await this.redisClient.set(key, value);
    }
  }

  public async get(key: string): Promise<any> {
    return await this.redisClient.get(key);
  }

  public async getMany(key: string): Promise<any> {
    return await this.redisClient.keys(key);
  }

  public async delete(key: string): Promise<any> {
    return await this.redisClient.del(key);
  }

  /**
   * Wraps a function call with caching.
   * @param key The cache key for storing/retrieving the result.
   * @param fn The function to be executed if the result is not found in the cache.
   * @param ttl The time-to-live (expiration time) for the cached value in seconds.
   * @returns The result of the function call, either retrieved from the cache or newly computed.
   */
  public async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cachedValue = await this.get(key);

    if (cachedValue) {
      return cachedValue as T; // Type assertion to ensure cachedValue is of type T
    }

    const result = await fn();
    await this.set(key, result, ttl);
    return result;
  }

  public async clear(): Promise<any> {
    return await this.redisClient.flushall();
  }
}
