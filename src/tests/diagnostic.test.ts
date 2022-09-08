import common from './data/common';
import axios from 'axios';
import {StatusCodes} from 'http-status-codes';

const _axios = axios.create({
  baseURL: common.baseURL + '/diagnostic',
  validateStatus: () => true, // allow bad status codes
});

describe('Diagnostic', () => {
  // blockchain tests make requests via ethers
  describe('Blockchain', () => {
    it('should get block number from provider', async () => {
      // get the block number
      const res = await _axios.get('/blockchain/getBlockNumber');
      expect(res.status).toEqual(StatusCodes.OK);
      expect(res.data.message).toEqual('');
      expect(res.data.data).toHaveProperty('blockNumber');
      expect(res.data.data.blockNumber).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Redis', () => {
    const key = 'TEST';
    const value = Math.random() * 10;

    it('should set value of a key', async () => {
      const res = await _axios.post('/redis/set', {
        key,
        value,
      });
      console.log('RESULT:', res);
      expect(res.status).toEqual(StatusCodes.CREATED);
      expect(res.data.message).toEqual('');
      expect(res.data.data).toEqual({});
    });

    it('should get value of that key', async () => {
      const res = await _axios.get('/redis/get?key=' + key);
      expect(res.status).toEqual(StatusCodes.OK);
      expect(res.data.message).toEqual('');
      expect(res.data.data).toHaveProperty('value');
      expect(res.data.data.value).toEqual(value.toString());
    });

    it('should delete value of that key', async () => {
      const res = await _axios.post('/redis/delete', {
        key,
      });
      expect(res.status).toEqual(StatusCodes.OK);
      expect(res.data.message).toEqual('');
      expect(res.data.data).toEqual({});
    });

    it('should have the new value as null', async () => {
      const res = await _axios.get('/redis/get?key=' + key);
      expect(res.status).toEqual(StatusCodes.OK);
      expect(res.data.message).toEqual('');
      expect(res.data.data).toHaveProperty('value');
      expect(res.data.data.value).toEqual(null);
    });
  });
});
