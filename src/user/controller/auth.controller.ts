import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { UserMapper } from '../mapper/user.mapper';
import { UserAuthRequest } from '../request/user_auth.request';
import { UserAuthTokenDto } from '../dto/user_auth_token.dto';
import { UserAuthTokenMapper } from '../mapper/user_auth_token.mapper';
import { UserAuthRequestManager } from '../service/user_auth.request_manager';
import { UserAccessTokenDto } from '../dto/user_access_token.dto';

@Controller('users/auth')
export class AuthController {
  constructor(
    private userMapper: UserMapper,
    private userAuthRequestManager: UserAuthRequestManager,
    private userAuthTokenMapper: UserAuthTokenMapper,
  ) {}

  @Post('token')
  async createAuthToken(
    @Body() userAuthRequest: UserAuthRequest,
  ): Promise<UserAuthTokenDto> {
    return this.userAuthRequestManager
      .generateToken(userAuthRequest)
      .then((userAuthTokenEntity) =>
        this.userAuthTokenMapper.mapAuthToken(userAuthTokenEntity),
      );
  }

  @Post()
  async authenticate(
    @Body() userAuthRequest: UserAuthRequest,
  ): Promise<UserAccessTokenDto> {
    return this.userAuthRequestManager
      .authenticate(userAuthRequest)
      .then((jwtToken) => this.userAuthTokenMapper.mapAccessToken(jwtToken));
  }
}
