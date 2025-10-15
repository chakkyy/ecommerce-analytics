import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { ChartType } from './chartType.entity';
import { FilterType } from './filterType.entity';
import { Metric } from './metric.entity';
import { Recipe } from './recipe.entity';

@Table({ paranoid: true, timestamps: true })
export class RecipeConfig extends Model<RecipeConfig> {
  @Column({ type: DataType.STRING })
  title: string;

  @Column({ allowNull: false, type: DataType.STRING })
  filterTypeDetail: string;

  @ForeignKey(() => Metric)
  @Column({ type: DataType.INTEGER })
  metricId: number;

  @BelongsTo(() => Metric)
  metric: Metric;

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

  @ForeignKey(() => FilterType)
  @Column({ type: DataType.INTEGER })
  filterTypeId: number;

  @BelongsTo(() => FilterType)
  filterType: FilterType;
}
