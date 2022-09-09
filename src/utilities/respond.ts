import {Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {logger} from './logger';

/**
 * A generic way to create a success response to an endpoint request.
 * Default status code is `200 OK`
 */
const success = (response: Response, message: string, data: object, statusCode: number = StatusCodes.OK) => {
  response.status(statusCode).json({
    message,
    data,
  });
};

/**
 * A generic way to create a failure response to an endpoint request; implies client error.
 * Default status code is `400 Bad Request`
 */
const failure = (response: Response, message: string, statusCode: number = StatusCodes.BAD_REQUEST) => {
  response.status(statusCode).json({
    message,
  });
};

/**
 * A generic way to create an error response to an endpoint request; implies server error.
 * Default status code is `500 Internal Server Error`
 */
const error = (
  error: unknown,
  response: Response,
  message: string,
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
) => {
  logger.log('SERVER ERROR:', error);
  response.status(statusCode).json({
    message,
  });
};

export const respond = {success, failure, error};
