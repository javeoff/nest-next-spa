import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';
import { getPageInterceptor } from '../interceptors/PageInterceptor';

export const Page = (route = '') =>
  applyDecorators(
    Get(route),
    UseInterceptors(getPageInterceptor(route)),
  );
