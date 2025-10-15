import { Table, Column, Model, BelongsToMany, DataType } from 'sequelize-typescript';
import { RecipesChartType } from '@models/company/recipesChartType.entity';
import { RecipesFilterType } from '@models/company/recipesFilterType.entity';

import { ChartType } from '@models/company/chartType.entity';
import { FilterType } from '@models/company/filterType.entity';

@Table({ paranoid: true, timestamps: true })
export class Recipe extends Model<Recipe> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  category: string;

  @BelongsToMany(() => ChartType, () => RecipesChartType)
  charts: ChartType[];

  @BelongsToMany(() => FilterType, () => RecipesFilterType)
  filters: FilterType[];
}
