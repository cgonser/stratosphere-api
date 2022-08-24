import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserMapper {
  map(user: UserEntity): UserDto {
    const userDto = new UserDto();

    userDto.id = user.id;
    userDto.name = user.name;
    userDto.email = user.email;
    userDto.walletAddress = user.walletAddress;

    return userDto;
  }

  mapMultiple(users: UserEntity[]): UserDto[] {
    return users.map((user) => this.map(user));
  }
}
