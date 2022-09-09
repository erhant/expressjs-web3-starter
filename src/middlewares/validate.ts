import Joi from 'joi';
import {Request, Response, NextFunction} from 'express';
import {respond} from '../utilities/respond';
import {StatusCodes} from 'http-status-codes';

/**
 * A request data-validation middleware.
 * @param {Joi.ObjectSchema} schema a JOI schema
 * @param {'body' | 'query' | 'params'} property which property of the request to validate. "body" by default
 * @returns a function that validates the given property with the given schema, which can be passed directly as a middleware
 */
export function validate(schema: Joi.ObjectSchema, property: 'body' | 'query' | 'params' = 'body') {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result: Joi.ValidationResult = schema.validate(request[property]);
    if (result.error) {
      // console.log(result.error);
      respond.failure(response, 'Data validation failed:\n' + result.error, StatusCodes.BAD_REQUEST);
    } else next();
  };
}
