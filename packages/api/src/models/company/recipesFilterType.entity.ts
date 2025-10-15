import { Table, Model, ForeignKey, BelongsTo, Column, DataType } from 'sequelize-typescript';
import { Recipe } from '@models/company/recipe.entity';
import { FilterType } from '@models/company/filterType.entity';

@Table({ paranoid: true, timestamps: true })
export class RecipesFilterType extends Model<RecipesFilterType> {
  @ForeignKey(() => Recipe)
  @Column({ type: DataType.INTEGER })
  recipeId: number;

  @BelongsTo(() => Recipe)
  recipe: Recipe;

  @ForeignKey(() => FilterType)
  @Column({ type: DataType.INTEGER })
  filterTypeId: number;

  @BelongsTo(() => FilterType)
  filterType: FilterType;
}
