import { Injectable } from '@nestjs/common';
import { UserManager } from './user.manager';
import { UserCreateRequest } from '../request/user.create.request';
import { UserEntity } from '../entity/user.entity';
import { UserUpdateRequest } from '../request/user.update.request';

@Injectable()
export class UserRequestManager {
  constructor(private userManager: UserManager) {}

  create(userCreateRequest: UserCreateRequest): Promise<UserEntity> {
    const user = new UserEntity();

    if (userCreateRequest.name) {
      user.name = userCreateRequest.name;
    }

    if (userCreateRequest.email) {
      user.email = userCreateRequest.email;
    }

    if (userCreateRequest.walletAddress) {
      user.walletAddress = userCreateRequest.walletAddress;
    }

    return this.userManager.create(user);
  }

  update(
    user: UserEntity,
    userUpdateRequest: UserUpdateRequest,
  ): Promise<UserEntity> {
    if (userUpdateRequest.name) {
      user.name = userUpdateRequest.name;
    }

    if (userUpdateRequest.email) {
      user.email = userUpdateRequest.email;
    }

    return this.userManager.update(user);
  }
}
