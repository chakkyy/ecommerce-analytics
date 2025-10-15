import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsEnum, IsDate, IsOptional, IsMobilePhone, IsString } from 'class-validator';

enum Locale {
  ES = 'es',
  EN = 'en',
  PT = 'pt',
}

export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({
    example: 'test@mail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    enum: Locale,
  })
  @IsOptional()
  @IsEnum(Locale, {
    message: 'select a locale between en, es or pt',
  })
  readonly locale: Locale;

  @IsOptional()
  @IsString({
    message: 'The token from google login',
  })
  readonly googleToken: string;

  @ApiProperty({
    example: '+34666666666',
  })
  @IsNotEmpty()
  @IsMobilePhone()
  readonly phoneNumber: string;

  @IsOptional()
  @IsDate()
  readonly validated_at: Date;

  @IsOptional()
  readonly invitationToken: string;
}

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
}
