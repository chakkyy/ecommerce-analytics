import { Table, Model, ForeignKey, BelongsTo, Column, DataType } from 'sequelize-typescript';
import { Recipe } from '@models/company/recipe.entity';
import { ChartType } from '@models/company/chartType.entity';

@Table({ paranoid: true, timestamps: true })
export class RecipesChartType extends Model<RecipesChartType> {
  @ForeignKey(() => Recipe)
  @Column({ type: DataType.INTEGER })
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;

  @ForeignKey(() => ChartType)
  @Column({ type: DataType.INTEGER })
  chartTypeId: number;

  @BelongsTo(() => ChartType)
  chartType: ChartType;
}
