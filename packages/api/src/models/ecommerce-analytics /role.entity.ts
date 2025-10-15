import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: true })
export class Role extends Model<Role> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  label: string;
}
