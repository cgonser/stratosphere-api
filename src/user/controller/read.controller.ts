import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserProvider } from '../service/user.provider';
import { UserMapper } from '../mapper/user.mapper';
import { JwtAuthGuard } from '../service/jwt.auth_guard';

@Controller('users')
export class ReadController {
  constructor(
    private userProvider: UserProvider,
    private userMapper: UserMapper,
  ) {}

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async get(@Request() req): Promise<UserDto> {
    return this.userProvider
      .get(req.user.userId)
      .then((user) => this.userMapper.map(user));
  }
}
