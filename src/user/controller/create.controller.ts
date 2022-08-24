import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { UserDto } from '../dto/user.dto';
import { UserMapper } from '../mapper/user.mapper';
import { UserCreateRequest } from '../request/user.create.request';
import { UserRequestManager } from '../service/user.request_manager';

@Controller('users')
export class CreateController {
  constructor(
    private userMapper: UserMapper,
    private userRequestManager: UserRequestManager,
  ) {}

  @Post()
  async create(@Body() userCreateRequest: UserCreateRequest): Promise<UserDto> {
    return this.userRequestManager
      .create(userCreateRequest)
      .then((user) => this.userMapper.map(user));
  }
}
