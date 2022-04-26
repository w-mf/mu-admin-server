import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  timezone: '+08:00',
  dateStrings: true,
  cache: {
    duration: 60000, // 1分钟的缓存
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  logging: false,
  synchronize: false,
  cli: {
    migrationsDir: './migration',
  },
}));
