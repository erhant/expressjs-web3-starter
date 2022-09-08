import common from './data/common';
import axios from 'axios';
import {StatusCodes} from 'http-status-codes';

const _axios = axios.create({
  baseURL: common.baseURL,
  validateStatus: () => true, // allow bad status codes
});

describe('Root', () => {
  it('should PONG when pinged', async () => {
    const res = await _axios.get('');
    expect(res.status).toEqual(StatusCodes.OK);
    expect(res.data.message).toEqual('PONG');
    expect(res.data.data).toEqual({});
  });
});
