import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsEnum, IsOptional, IsMobilePhone } from 'class-validator';

enum Locale {
  ES = 'es',
  EN = 'en',
  PT = 'pt',
}

export class UserUpdateDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({
    example: 'test@mail.com',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    enum: Locale,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Locale, {
    message: 'select a locale between en, es or pt',
  })
  readonly locale: Locale;

  @ApiProperty({
    example: '+34666666666',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsMobilePhone()
  readonly phoneNumber: string;
}
