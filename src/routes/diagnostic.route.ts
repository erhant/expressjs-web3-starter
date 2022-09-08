import {Router} from 'express';
import {
  getBlockNumber,
  redisDeleteKey,
  redisGetKey,
  redisSetKey,
} from '../controllers/diagnostic.controller';
import {
  redisGetKeyValidator,
  redisDeleteKeyValidator,
  redisSetKeyValidator,
} from '../validators/diagnostic.validator';

const router = Router();

// blockchainClient
router.get('/blockchain/getBlockNumber', getBlockNumber);

// redis
router.get('/redis/get', redisGetKeyValidator, redisGetKey);
router.post('/redis/set', redisSetKeyValidator, redisSetKey);
router.post('/redis/delete', redisDeleteKeyValidator, redisDeleteKey);

export default router;
