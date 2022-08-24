import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuthTokenEntity } from '../entity/user_auth_token.entity';
import { UserEntity } from '../entity/user.entity';
import crypto = require('crypto');

@Injectable()
export class UserAuthTokenManager {
  constructor(
    @InjectRepository(UserAuthTokenEntity)
    private userAuthTokenRepository: Repository<UserAuthTokenEntity>,
  ) {}

  generateAuthTokenForUser(user: UserEntity): Promise<UserAuthTokenEntity> {
    const userAuthTokenEntity = new UserAuthTokenEntity();
    userAuthTokenEntity.user = user;
    userAuthTokenEntity.token = this.generateRandomToken();
    userAuthTokenEntity.expires_at = this.generateTokenExpiration();

    return this.userAuthTokenRepository.save(userAuthTokenEntity);
  }

  markAsUsed(userAuthToken: UserAuthTokenEntity): void {
    userAuthToken.used_at = new Date();

    this.userAuthTokenRepository.save(userAuthToken);
  }

  generateRandomToken = (): string => crypto.randomBytes(32).toString('hex');

  generateTokenExpiration = (): Date => new Date(Date.now() + 1000 * 360);
}
