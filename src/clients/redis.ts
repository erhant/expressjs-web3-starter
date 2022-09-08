import {createClient, RedisClientType} from 'redis';
import config from '../configurations';
import {Client} from '.';

class RedisClient implements Client {
  private static instance: RedisClient;
  public client: RedisClientType;

  private constructor(url: string) {
    this.client = createClient({url});

    // @TODO setup better error handler
    this.client.on('error', (err: unknown) =>
      console.log('Redis Client Error', err)
    );
  }

  /// Calls connect function
  public setup(): Promise<void> {
    return this.client.connect();
  }

  /// Calls destroy function
  public destroy(): Promise<void> {
    return this.client.quit(); // this is more graceful than .disconnect
  }

  /// Ping redis
  public async healthcheck(): Promise<boolean> {
    const res = await this.client.ping();
    return res === 'PONG';
  }

  /**
   * Singleton accessor of RedisClient
   * @returns single instance
   */
  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient(config.Redis.URL);
    }
    return RedisClient.instance;
  }
}

export function redisClient(): RedisClient {
  return RedisClient.getInstance();
}
