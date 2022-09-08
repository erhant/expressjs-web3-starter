import type {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {prismaClient} from '../clients/prisma';
import {respond} from '../utilities/respond';
import {User} from '@prisma/client';
import constants from '../constants';

/**
 * Adds a user with the given public key.
 */
export async function addUser(request: Request, response: Response) {
  const publicKey = response.locals[constants.Signatures.PublicKeyKey];

  // check if user exists
  try {
    const result = await prismaClient().prisma.user.findUnique({
      where: {
        publicKey,
      },
    });
    if (result) {
      return respond.failure(response, 'User already exists.');
    }
  } catch (e) {
    return respond.error(e, response, 'addUser findUnique');
  }

  try {
    const data = {
      publicKey,
    };
    await prismaClient().prisma.user.create({data});
  } catch (e) {
    return respond.error(e, response, 'addUser create');
  }

  return respond.success(response, '', {}, StatusCodes.CREATED);
}

/**
 * Returns a user with the given public key.
 */
export async function getUser(request: Request, response: Response) {
  const {publicKey} = request.params;

  let result: User | null;
  try {
    result = await prismaClient().prisma.user.findUnique({
      where: {
        publicKey: Buffer.from(publicKey, 'hex'),
      },
    });
  } catch (e) {
    return respond.error(e, response, 'getUser findUnique');
  }

  return respond.success(response, '', {user: result});
}

/**
 * Returns all users
 */
export async function getAllUsers(request: Request, response: Response) {
  let results: User[];
  try {
    results = await prismaClient().prisma.user.findMany();
  } catch (e) {
    return respond.error(e, response, 'getAllUsers findMany');
  }

  return respond.success(response, '', {users: results});
}

/**
 * Deletes a user with the given public key
 */
export async function deleteUser(request: Request, response: Response) {
  const publicKey = response.locals[constants.Signatures.PublicKeyKey];

  try {
    await prismaClient().prisma.user.delete({
      where: {
        publicKey,
      },
    });
  } catch (e) {
    return respond.error(e, response, 'deleteUser delete');
  }

  return respond.success(response, '', {});
}
