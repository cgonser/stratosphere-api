import { EntityNotFoundError } from 'typeorm';
import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';

@Catch(EntityNotFoundError)
export class EntityNotFoundErrorFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    super.catch(new NotFoundException(), host);
  }
}
