import {prismaClient} from './prisma';
import {redisClient} from './redis';
import {blockchainClient} from './subnet';

/**
 * Calls destroy of each client singleton.
 */
export async function destroyClients(): Promise<void> {
  await Promise.all([
    blockchainClient().destroy(),
    redisClient().destroy(),
    prismaClient().destroy(),
  ]);
}

/**
 * Calls setup of each client singleton and performs a healthcheck.
 * @returns true if all clients pass the healthcheck
 */
export async function setupClients(): Promise<boolean> {
  // setups
  await Promise.all([
    blockchainClient().setup(),
    redisClient().setup(),
    prismaClient().setup(),
  ]);
  // healthchecks
  const hc = await Promise.all([
    blockchainClient().healthcheck(),
    redisClient().healthcheck(),
    prismaClient().healthcheck(),
  ]);
  // true if all pass
  return hc.every(b => b);
}

export abstract class Client {
  public abstract setup(): Promise<void>;
  public abstract destroy(): Promise<void>;
  public abstract healthcheck(): Promise<boolean>;
}
