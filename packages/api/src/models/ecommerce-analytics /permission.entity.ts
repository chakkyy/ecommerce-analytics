import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: true })
export class Permission extends Model<Permission> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  target: string;
}
