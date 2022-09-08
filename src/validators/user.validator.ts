import Joi from 'joi';
import {validate} from '../middlewares/validate';
import {getUserParams} from '../interfaces/user.interface';

export const getUserValidator = validate(
  Joi.object<getUserParams>({
    publicKey: Joi.string().hex().length(66).required(), // 32 byte X coord + 1 byte prefix = 66 characters
  }),
  'params'
);
