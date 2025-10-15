import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RecipesFilterType } from '@models/company/recipesFilterType.entity';
import { RecipesChartType } from '@models/company/recipesChartType.entity';

export class RecipeDto {
  @ApiProperty({
    name: 'id',
    example: '1',
  })
  readonly id: number;

  @ApiProperty({
    name: 'name',
    example: 'Costos por transacción',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    name: 'description',
    example: 'El promedio de costos asociados con cada transacción en la tienda en línea.',
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    name: 'category',
    example: 'Finanzas',
  })
  @IsNotEmpty()
  readonly category: string;

  @ApiProperty({
    name: 'createdAt',
    example: '2023-03-13T18:54:41.786Z',
  })
  @IsNotEmpty()
  readonly createdAt: string;

  @ApiProperty({
    name: 'updatedAt',
    example: '2023-03-13T18:54:41.786Z',
  })
  @IsNotEmpty()
  readonly updatedAt: string;

  @ApiProperty({
    name: 'deletedAt',
    example: 'null',
  })
  @IsNotEmpty()
  readonly deletedAt: string;

  @ApiProperty({
    name: 'recipesFilterType',
    example: [
      {
        id: 2,
        createdAt: '2023-03-13T18:54:41.818Z',
        updatedAt: '2023-03-13T18:54:41.818Z',
        deletedAt: null,
        filterTypeId: 3,
        recipeId: 1,
        filterType: {
          id: 3,
          name: 'Rango de costo',
          createdAt: '2023-03-13T18:54:41.796Z',
          updatedAt: '2023-03-13T18:54:41.796Z',
          deletedAt: null,
        },
      },
      {
        id: 1,
        createdAt: '2023-03-13T18:54:41.818Z',
        updatedAt: '2023-03-13T18:54:41.818Z',
        deletedAt: null,
        filterTypeId: 2,
        recipeId: 1,
        filterType: {
          id: 2,
          name: 'Rango de tiempo',
          createdAt: '2023-03-13T18:54:41.796Z',
          updatedAt: '2023-03-13T18:54:41.796Z',
          deletedAt: null,
        },
      },
    ],
  })
  readonly recipesFilterType: RecipesFilterType;

  @ApiProperty({
    name: 'recipesChartType',
    example: [
      {
        id: 1,
        createdAt: '2023-03-13T18:54:41.809Z',
        updatedAt: '2023-03-13T18:54:41.809Z',
        deletedAt: null,
        chartTypeId: 1,
        recipeId: 1,
        chartType: {
          id: 1,
          name: 'KPI',
          createdAt: '2023-03-13T18:54:41.803Z',
          updatedAt: '2023-03-13T18:54:41.803Z',
          deletedAt: null,
        },
      },
      {
        id: 2,
        createdAt: '2023-03-13T18:54:41.809Z',
        updatedAt: '2023-03-13T18:54:41.809Z',
        deletedAt: null,
        chartTypeId: 2,
        recipeId: 1,
        chartType: {
          id: 2,
          name: 'Grafico de Lineas',
          createdAt: '2023-03-13T18:54:41.803Z',
          updatedAt: '2023-03-13T18:54:41.803Z',
          deletedAt: null,
        },
      },
    ],
  })
  readonly recipesChartType: RecipesChartType;
}
