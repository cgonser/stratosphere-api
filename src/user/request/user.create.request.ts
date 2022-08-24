import {
  IsEmail,
  IsEthereumAddress,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UserCreateRequest {
  @IsString()
  name: string;

  @ValidateIf((o) => !o.walletAddress)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateIf((o) => !o.email)
  @IsNotEmpty()
  @IsEthereumAddress()
  walletAddress: string;
}
