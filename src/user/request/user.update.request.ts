import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateRequest {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
