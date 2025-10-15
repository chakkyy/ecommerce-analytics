import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FilterTypeDto {
  @ApiProperty({
    name: 'Filter type name',
    example: 'Rango de tiempo o Rango de costo',
  })
  @IsNotEmpty()
  readonly name: string;
}
