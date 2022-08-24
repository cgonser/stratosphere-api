import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: UserEntity) {
    const payload = {
      userId: user.id,
      walletAddress: user.walletAddress,
    };

    return this.jwtService.sign(payload);
  }
}
