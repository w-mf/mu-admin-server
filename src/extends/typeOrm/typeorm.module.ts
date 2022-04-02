import { TypeOrmModule as TypeOrm } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export function TypeOrmModule() {
  return TypeOrm.forRootAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => config.get('database'),
    inject: [ConfigService],
  });
}
