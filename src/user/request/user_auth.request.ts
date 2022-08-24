import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class UserAuthRequest {
  @IsNotEmpty()
  @IsEthereumAddress()
  walletAddress: string;

  token: string;

  signature: string;
}
