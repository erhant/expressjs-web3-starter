import Joi from 'joi';
import {validate} from '../middlewares/validate';
import {
  redisSetKeyBody,
  redisDeleteKeyBody,
  redisGetKeyQuery,
} from '../interfaces/diagnostic.interface';

export const redisGetKeyValidator = validate(
  Joi.object<redisGetKeyQuery>({
    key: Joi.string().required(),
  }),
  'query'
);

export const redisDeleteKeyValidator = validate(
  Joi.object<redisDeleteKeyBody>({
    key: Joi.string().required(),
  })
);

export const redisSetKeyValidator = validate(
  Joi.object<redisSetKeyBody>({
    key: Joi.string().required(),
    value: Joi.required(),
  })
);
