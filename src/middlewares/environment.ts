import config from '../configurations';
import {Request, Response, NextFunction} from 'express';
import {respond} from '../utilities/respond';
import {StatusCodes} from 'http-status-codes';

/**
 * A middleware that only allows the endpoint if the environment is in testing mode.
 */
export async function onlyIfTesting(request: Request, response: Response, next: NextFunction) {
  if (config.Environment !== 'test') {
    respond.failure(response, 'Not allowed.', StatusCodes.FORBIDDEN);
  } else next();
}
