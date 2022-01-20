import * as dotenv from 'dotenv';
import { resolve } from 'path';

const res = dotenv.config({
  path:
    process.env.NODE_ENV === 'prod'
      ? resolve(process.cwd(), '.env.production')
      : resolve(process.cwd(), '.env.development'),
});
if (res.error) {
  throw res.error;
}
const env = res.parsed;
module.exports = {
  type: env.DATABASE_TYPE,
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASS,
  database: env.DATABASE_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['migration/*{.js,.ts}'],
  logging: true,
  synchronize: false,
  cli: {
    migrationsDir: './migration',
  },
};
