import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { ObjectUtils } from 'ts-commons';

@Injectable()
export class RedisService {
  readonly client: redis.RedisClient;
  constructor() {
    const config: redis.ClientOpts = {
      host: '118.25.40.123',
      password: 'test@123',
      db: 10,
    };

    this.client = redis.createClient(config);
    this.client.on('ready', this.clientOnReady);
    this.client.on('connect', this.clientOnConnect);
    this.client.on('error', this.clientOnError);
  }

  public set(key: string, value: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        if (ObjectUtils.isNullOrUndefined(err)) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  public setWithExpire(
    key: string,
    value: string,
    expireSeconds: number,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client.set(key, value, 'EX', expireSeconds, (err, reply) => {
        if (ObjectUtils.isNullOrUndefined(err)) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  public get(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (ObjectUtils.isNullOrUndefined(err)) {
          resolve(reply);
        } else {
          reject(err);
        }
      });
    });
  }

  public mget(keys: string[]): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.client.mget(keys, (err, reply) => {
        if (ObjectUtils.isNullOrUndefined(err)) {
          resolve(reply);
        } else {
          reject(err);
        }
      });
    });
  }

  private clientOnReady(): void {
    console.log('redis ready');
  }

  private clientOnConnect(): void {
    console.log('redis connect');
  }

  private clientOnError(error): void {
    console.error('redis error: ', error);
    process.exit(2);
  }
}
