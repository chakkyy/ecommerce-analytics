import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ paranoid: true, timestamps: true })
export class FilterType extends Model<FilterType> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name: string;
}
