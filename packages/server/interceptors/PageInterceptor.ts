import {
  CallHandler,
  ExecutionContext,
  Injectable,
  mixin,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AnyObject } from 'immer/dist/types/types-internal';
import { map, Observable } from 'rxjs';

import { ApiInterceptor } from './ApiInterceptor';

@Injectable()
abstract class PageInterceptor implements NestInterceptor {
  protected abstract readonly route: string;

  public constructor(
    private readonly formatApiResponseInterceptor: ApiInterceptor,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    const isApi = !!request.query.api;

    if (isApi) {
      return this.formatApiResponseInterceptor.intercept(context, next);
    }

    return next.handle().pipe(
      map(async (payload) => {
        await response.render(this.route, payload as AnyObject);
        await new Promise<void>((resolve) => process.nextTick(resolve));
      }),
    );
  }
}

export const getPageInterceptor = (route: string): Type =>
  mixin(
    class extends PageInterceptor {
      protected readonly route = route;
    },
  );
