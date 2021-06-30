import { Inject } from '@nestjs/common';

export const InjectKnex = () => Inject('KNEX_CONNECTION');
