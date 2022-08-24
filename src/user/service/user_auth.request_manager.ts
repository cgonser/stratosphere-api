import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserManager } from './user.manager';
import { UserEntity } from '../entity/user.entity';
import { UserProvider } from './user.provider';
import { UserAuthRequest } from '../request/user_auth.request';
import { UserAuthTokenManager } from './user_auth_token.manager';
import { UserAuthTokenEntity } from '../entity/user_auth_token.entity';
import { bufferToHex } from 'ethereumjs-util';
import { recoverPersonalSignature } from 'eth-sig-util';
import { UserAuthTokenProvider } from './user_auth_token.provider';
import { AuthService } from './auth.service';

@Injectable()
export class UserAuthRequestManager {
  constructor(
    private userProvider: UserProvider,
    private userManager: UserManager,
    private userAuthTokenManager: UserAuthTokenManager,
    private userAuthTokenProvider: UserAuthTokenProvider,
    private authService: AuthService,
  ) {}

  async authenticate(userAuthRequest: UserAuthRequest): Promise<string> {
    const retrievedAddress = this.retrieveAddressFromSignature(userAuthRequest);

    if (retrievedAddress.toLowerCase() !== userAuthRequest.walletAddress.toLowerCase()) {
      throw new UnauthorizedException();
    }

    const user = await this.userProvider.getBy({
      walletAddress: userAuthRequest.walletAddress,
    });

    const userAuthToken = await this.userAuthTokenProvider.getBy({
      token: userAuthRequest.token,
    });

    if (user.id !== userAuthToken.user.id || userAuthToken.used_at !== null) {
      throw new UnauthorizedException('Invalid token');
    }

    if (userAuthToken.expires_at < new Date()) {
      throw new UnauthorizedException('Expired token');
    }

    this.userAuthTokenManager.markAsUsed(userAuthToken);

    return this.authService.login(user);
  }

  retrieveAddressFromSignature(userAuthRequest: UserAuthRequest): string {
    try {
      return recoverPersonalSignature({
        data: bufferToHex(Buffer.from(userAuthRequest.token, 'utf8')),
        sig: userAuthRequest.signature,
      });
    } catch (e) {
      throw new UnauthorizedException('Invalid signature');
    }
  }

  generateToken(
    userAuthRequest: UserAuthRequest,
  ): Promise<UserAuthTokenEntity> {
    return this.createOrRetrieveUser(userAuthRequest.walletAddress).then(
      (user) => this.userAuthTokenManager.generateAuthTokenForUser(user),
    );
  }

  async createOrRetrieveUser(walletAddress: string): Promise<UserEntity> {
    let user = await this.userProvider.findOneBy({
      walletAddress: walletAddress,
    });

    if (user) {
      return user;
    }

    user = new UserEntity();
    user.walletAddress = walletAddress;
    return this.userManager.create(user);
  }
}