import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: true })
export class Sector extends Model<Sector> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
