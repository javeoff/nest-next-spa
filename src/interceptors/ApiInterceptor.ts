import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AnyObject } from 'immer/dist/types/types-internal';

interface IResponse<T extends AnyObject = AnyObject> {
  code: number;
  payload: T;
  message: string;
  error?: Record<string, unknown>;
}

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      map(
        (payload): IResponse => ({
          code: HttpStatus.OK,
          message: '',
          payload: payload || {},
        }),
      ),
    );
  }
}
