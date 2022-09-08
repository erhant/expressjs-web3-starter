import {Request, Response, NextFunction} from 'express';
import {respond} from '../utilities/respond';
import {StatusCodes} from 'http-status-codes';
import {ethers} from 'ethers';
import constants from '../constants';

/**
 * A middleware that computes public key from a signature. Requests with this middleware
 * can be sure that the requesting client has the corresponding private keys.
 */
export async function getPublicKey(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const signature = request.headers[constants.Signatures.HeaderKey];

  if (signature === undefined || typeof signature !== 'string') {
    return respond.failure(
      response,
      'No signature found.',
      StatusCodes.BAD_REQUEST
    );
  }

  // get the public key of the signer
  const uncompressedPublicKey = ethers.utils.recoverPublicKey(
    constants.Signatures.Challenge,
    signature
  );

  // add key to locals
  response.locals[constants.Signatures.PublicKeyKey] = Buffer.from(
    ethers.utils.computePublicKey(uncompressedPublicKey, true).slice(2), // slice removes 0x prefix
    'hex'
  );

  next();
}
