import { NextFunction } from 'express';
import ErrorResponse from 'helper/errorResponse';
import { Schema } from 'joi';
import { CustomRequest } from 'types';

const validateSchema = ({
  schema,
  req,
  next,
}: {
  schema: Schema;
  req: CustomRequest;
  next: NextFunction;
}) => {
  const { value, error } = schema.validate(req.body);
  if (error) return new ErrorResponse(error, 400);
  req.value = value;
  next();
};

export default validateSchema;
