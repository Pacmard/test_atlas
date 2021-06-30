import * as assert from 'assert';
import { Knex } from 'knex';

const config = {
    DB_HOST: 'localhost',
    DB_PORT: 3306,
    DB_USERNAME: 'root',
    DB_PASSWD: 'passwd',
    DB_NAME: 'test',
}

const {
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWD,
    DB_NAME,
} = config

assert.ok(DB_HOST);
assert.ok(DB_PORT);
assert.ok(DB_USERNAME);
assert.ok(DB_NAME);

export const knexConfig: Knex.Config = {
    client: 'mysql',
    connection: {
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USERNAME,
      password: DB_PASSWD,
      database: DB_NAME,
    },
  };