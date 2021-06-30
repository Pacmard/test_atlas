const Knex = require('knex');
import { knexConfig } from './knex.config';

export const KnexProvider = {
  provide: 'KNEX_CONNECTION',
  useFactory() {
    return Knex(knexConfig);
  },
};
