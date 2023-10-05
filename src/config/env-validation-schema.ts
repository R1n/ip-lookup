import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'test', 'prod').default('dev'),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean(),
  TYPEORM_LOGGING: Joi.boolean(),
  TYPEORM_DROPSCHEMA: Joi.boolean(),
  PORT: Joi.number(),
});
