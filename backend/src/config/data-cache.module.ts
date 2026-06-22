import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";


@Module({
  imports: [
    CacheModule.register({
        max: 100,
        ttl: 5 * 60 * 1000, // 5 minutos
        isGlobal: true
    }),
  ],
  exports: [CacheModule],
})
export class DataCacheModule {}
