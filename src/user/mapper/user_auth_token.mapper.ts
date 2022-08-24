import { Injectable } from '@nestjs/common';
import { UserAuthTokenEntity } from '../entity/user_auth_token.entity';
import { UserAuthTokenDto } from '../dto/user_auth_token.dto';
import { UserAccessTokenDto } from '../dto/user_access_token.dto';

@Injectable()
export class UserAuthTokenMapper {
  mapAuthToken(userAuthToken: UserAuthTokenEntity): UserAuthTokenDto {
    const userAuthTokenDto = new UserAuthTokenDto();

    userAuthTokenDto.walletAddress = userAuthToken.user.walletAddress;
    userAuthTokenDto.token = userAuthToken.token;

    return userAuthTokenDto;
  }

  mapAccessToken(jwtToken: string): UserAccessTokenDto {
    const userAccessTokenDto = new UserAccessTokenDto();

    userAccessTokenDto.jwtToken = jwtToken;

    return userAccessTokenDto;
  }
}
