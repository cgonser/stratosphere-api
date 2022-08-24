import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuthTokenEntity } from '../entity/user_auth_token.entity';
import { AbstractProvider } from '../../shared/service/abstract.provider';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class UserAuthTokenProvider extends AbstractProvider<UserAuthTokenEntity> {
  constructor(
    @InjectRepository(UserAuthTokenEntity)
    repository: Repository<UserAuthTokenEntity>,
  ) {
    super(repository);
  }

  prepareFindOneOptions(criteria: any): FindOneOptions {
    return {
      where: criteria,
      relations: {
        user: true,
      },
    };
  }
}
