import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { validationSchema } from './env-validation-schema';
import databaseConfig from '../database/typeorm.config';
import ipConfig from '../modules/ip/config/ip.config';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  envFilePath: `.env`,
  ignoreEnvFile: process.env.NODE_ENV === 'prod',
  validationSchema,
  load: [databaseConfig, ipConfig],
};
