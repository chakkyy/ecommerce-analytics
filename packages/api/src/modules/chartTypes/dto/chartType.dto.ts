import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChartTypeDto {
  @ApiProperty({
    name: 'Chart type name',
    example: 'KPI o Grafico de Lineas (X tiempo , Y costo)',
  })
  @IsNotEmpty()
  readonly name: string;
}
