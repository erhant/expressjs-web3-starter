import {PrismaClient as Prisma} from '@prisma/client';
import {Client} from '.';

class PrismaClient implements Client {
  private static instance: PrismaClient;
  public prisma: Prisma;

  private constructor() {
    this.prisma = new Prisma();
  }

  /**
   * Calls $connect() of prisma client. Normally, prisma uses lazy load by calling connect on
   * first request under the hood. We can connect explicitly like this.
   */
  public async setup(): Promise<void> {
    return this.prisma.$connect();
  }

  public async destroy(): Promise<void> {
    await this.prisma.$disconnect();
  }

  public async healthcheck(): Promise<boolean> {
    try {
      // send a simple query for healthcheck
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (e) {
      return false;
    }
  }

  public static getInstance(): PrismaClient {
    if (!PrismaClient.instance) {
      PrismaClient.instance = new PrismaClient();
    }
    return PrismaClient.instance;
  }
}

export function prismaClient(): PrismaClient {
  return PrismaClient.getInstance();
}
