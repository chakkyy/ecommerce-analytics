import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CompanyDto {
  @ApiProperty({
    name: 'businessName',
    example: 'business',
  })
  @IsNotEmpty()
  readonly businessName: string;

  @ApiProperty({
    name: 'employeesNumber',
    example: '0-50',
  })
  @IsNotEmpty()
  readonly employeesNumber: string;

  @ApiProperty({
    name: 'logo',
    example: 'https://s3.image.url',
  })
  @IsOptional()
  @IsUrl()
  readonly logo;
}
