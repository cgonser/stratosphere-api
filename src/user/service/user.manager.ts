import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserManager {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  update(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }
}
