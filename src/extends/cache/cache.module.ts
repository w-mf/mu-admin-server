import { CacheModule as Cache } from '@nestjs/common';

export function CacheModule() {
  return Cache.register();
}
