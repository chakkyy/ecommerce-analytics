import { Table, Column, Model, ForeignKey, BelongsTo, HasOne, DataType } from 'sequelize-typescript';
import { Dashboard } from './dashboard.entity';
import { RecipeConfig } from './recipeConfig';

@Table({ paranoid: true, timestamps: true })
export class Metric extends Model<Metric> {
  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.INTEGER })
  positionX: number;

  @Column({ type: DataType.INTEGER })
  positionY: number;

  @Column({ type: DataType.INTEGER })
  spanX: number;

  @Column({ type: DataType.INTEGER })
  spanY: number;

  @ForeignKey(() => Dashboard)
  @Column({ type: DataType.INTEGER })
  dashboardId: number;

  @BelongsTo(() => Dashboard)
  dashboard: Dashboard;

  @HasOne(() => RecipeConfig)
  recipeConfig: RecipeConfig;
}
