import { Table, Column, Model, DataType } from 'sequelize-typescript';
@Table({ timestamps: true })
export class Country extends Model<Country> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  iso: string;
}
