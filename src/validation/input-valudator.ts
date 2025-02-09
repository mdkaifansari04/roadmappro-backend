import { NextFunction, Response } from 'express';
import Joi from 'joi';
import { CustomRequest } from 'types';
import validateSchema from './user-api-validation';

export const roadmapInputValidator = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const inputSchema = Joi.object().keys({
    topic: Joi.string().required(),
    skillLevel: Joi.string().required(),
    duration: Joi.number().optional(),
  });

  validateSchema({ schema: inputSchema, req, next });
};
