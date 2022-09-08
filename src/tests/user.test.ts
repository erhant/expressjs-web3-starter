import common from './data/common';
import axios from 'axios';
import {ethers, Wallet} from 'ethers';
import {StatusCodes} from 'http-status-codes';
import constants from '../constants';

const _axios = axios.create({
  baseURL: common.baseURL + '/user',
  validateStatus: () => true, // allow bad status codes
});

describe('User', () => {
  let client: Wallet;
  let signature: string;
  let publicKey: string;

  beforeAll(async () => {
    client = new ethers.Wallet(common.avalanchePrivateKey);
    signature = client
      ._signingKey()
      .signDigest(constants.Signatures.Challenge).compact;
    publicKey = ethers.utils.computePublicKey(client.publicKey, true);
    console.log('Client public key:', publicKey);
  });

  it('should add user to database', async () => {
    const res = await _axios.post('/add', undefined, {
      headers: {
        [constants.Signatures.HeaderKey]: signature,
      },
    });
    expect(res.status).toEqual(StatusCodes.CREATED);
    expect(res.data.message).toEqual('');
    expect(res.data.data).toEqual({});
  });

  it('should not add user to database without signature header', async () => {
    const res = await _axios.post('/add');
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.data.message).toEqual('No signature found.');
  });

  it('should not add the same user to database', async () => {
    const res = await _axios.post('/add', undefined, {
      headers: {
        [constants.Signatures.HeaderKey]: signature,
      },
    });
    expect(res.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.data.message).toEqual('User already exists.');
  });

  it('should get the newly added user', async () => {
    const res = await _axios.get('/get/' + publicKey.slice(2));
    console.log('USER', res.data);
    expect(res.status).toEqual(StatusCodes.OK);
    expect(res.data.message).toEqual('');
    expect(res.data.data).toHaveProperty('user');
    expect(res.data.data.user).not.toEqual(null);
  });

  it('should remove user from database', async () => {
    const res = await _axios.post('/delete', undefined, {
      headers: {
        [constants.Signatures.HeaderKey]: signature,
      },
    });
    expect(res.status).toEqual(StatusCodes.OK);
    expect(res.data.message).toEqual('');
    expect(res.data.data).toEqual({});
  });

  it('should not get the newly deleted user', async () => {
    const res = await _axios.get('/get/' + publicKey.slice(2));
    expect(res.status).toEqual(StatusCodes.OK);
    expect(res.data.message).toEqual('');
    expect(res.data.data).toHaveProperty('user');
    expect(res.data.data).toEqual({
      user: null,
    });
  });
});
