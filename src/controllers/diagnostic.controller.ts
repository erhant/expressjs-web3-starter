import type {Request, Response} from 'express';
import {respond} from '../utilities/respond';
import {blockchainClient} from '../clients/blockchain';
import {redisClient} from '../clients/redis';
import {StatusCodes} from 'http-status-codes';
import {redisSetKeyBody, redisDeleteKeyBody, redisGetKeyQuery} from '../interfaces/diagnostic.interface';

export async function getBlockNumber(request: Request, response: Response) {
  const blockNumber = await blockchainClient().provider.getBlockNumber();
  return respond.success(response, '', {
    blockNumber,
  });
}

export async function redisSetKey(request: Request<{}, {}, redisSetKeyBody>, response: Response) {
  const {key, value} = request.body;
  await redisClient().client.set(key, value);
  return respond.success(response, '', {}, StatusCodes.CREATED);
}

export async function redisGetKey(request: Request, response: Response) {
  const {key} = request.query as unknown as redisGetKeyQuery;
  const value = await redisClient().client.get(key as string);
  return respond.success(response, '', {
    value,
  });
}

export async function redisDeleteKey(request: Request<{}, {}, redisDeleteKeyBody>, response: Response) {
  const {key} = request.body;
  await redisClient().client.del(key);
  return respond.success(response, '', {});
}
