import { Global, Module } from '@nestjs/common';
import { ApiInterceptor } from './interceptors/ApiInterceptor';

@Global()
@Module({
  providers: [ApiInterceptor],
  exports: [ApiInterceptor],
})
export class NestNextSpaModule {}
