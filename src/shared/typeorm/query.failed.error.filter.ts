import { QueryFailedError } from 'typeorm';
import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';

@Catch(QueryFailedError)
export class QueryFailedErrorFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    const detail = exception.detail;

    if (typeof detail === 'string' && detail.includes('already exists')) {
      const messageStart = exception.table.split('_').join(' ') + ' with';
      super.catch(
        new BadRequestException(exception.detail.replace('Key', messageStart)),
        host,
      );
    }

    return super.catch(exception, host);
  }
}
