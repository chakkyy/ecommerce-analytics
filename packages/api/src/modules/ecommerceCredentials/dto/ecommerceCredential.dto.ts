import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EcommerceCredentialDto {
  @ApiProperty({
    example: 'vtex-ecommerce-1',
  })
  @IsNotEmpty()
  readonly ecommerceKey: string;

  @ApiProperty({
    example: 'url',
  })
  @IsNotEmpty()
  readonly keyType: string;

  @ApiProperty({
    example: 'https://vtex.com/vtex-ecommerce-1',
  })
  @IsNotEmpty()
  readonly keyValue: string;
}
