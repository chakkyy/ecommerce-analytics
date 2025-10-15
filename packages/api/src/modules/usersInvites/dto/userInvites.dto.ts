import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserInvitesDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  companyId: number;
}
