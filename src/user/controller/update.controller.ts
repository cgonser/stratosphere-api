import { Controller, Patch, Request, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { UserDto } from '../dto/user.dto';
import { UserMapper } from '../mapper/user.mapper';
import { UserRequestManager } from '../service/user.request_manager';
import { UserProvider } from '../service/user.provider';
import { JwtAuthGuard } from '../service/jwt.auth_guard';
import { UserUpdateRequest } from '../request/user.update.request';

@Controller('users')
export class UpdateController {
  constructor(
    private userProvider: UserProvider,
    private userMapper: UserMapper,
    private userRequestManager: UserRequestManager,
  ) {}

  @Patch('current')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() userUpdateRequest: UserUpdateRequest,
    @Request() req,
  ): Promise<UserDto> {
    const user = await this.userProvider.get(req.user.userId);

    return this.userRequestManager
      .update(user, userUpdateRequest)
      .then((user) => this.userMapper.map(user));
  }
}
