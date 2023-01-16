import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    
    return next
      .handle()
      .pipe(
        map( (data: any) => ({
          statusCode: context.switchToHttp().getResponse().statusCode,
          success: true,
          data: data.res || {},
          message: data.message || 'Success',
          timestamp: new Date().toISOString(),
        })
      ));
  }
}
