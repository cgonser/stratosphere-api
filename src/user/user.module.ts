import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserProvider } from './service/user.provider';
import { CreateController } from './controller/create.controller';
import { ReadController } from './controller/read.controller';
import { UserMapper } from './mapper/user.mapper';
import { UserRequestManager } from './service/user.request_manager';
import { UserManager } from './service/user.manager';
import { AuthController } from './controller/auth.controller';
import { UserAuthTokenManager } from './service/user_auth_token.manager';
import { UserAuthRequestManager } from './service/user_auth.request_manager';
import { UserAuthTokenProvider } from './service/user_auth_token.provider';
import { UserAuthTokenMapper } from './mapper/user_auth_token.mapper';
import { UserAuthTokenEntity } from './entity/user_auth_token.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from './config/jwt.config';
import { JwtStrategy } from './service/jwt.strategy';
import { AuthService } from './service/auth.service';
import { UpdateController } from './controller/update.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([UserAuthTokenEntity]),
    PassportModule,
    JwtModule.register(jwtConfig),
  ],
  controllers: [
    AuthController,
    CreateController,
    ReadController,
    UpdateController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UserAuthTokenProvider,
    UserProvider,
    UserAuthTokenMapper,
    UserMapper,
    UserAuthRequestManager,
    UserRequestManager,
    UserAuthTokenManager,
    UserManager,
  ],
})
export class UserModule {}
