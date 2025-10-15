import { Table, Column, Model, ForeignKey, BelongsTo, DataType, PrimaryKey } from 'sequelize-typescript';
import { EcommerceConnect } from './ecommerceConnect.entity';
import { EcommerceClientGlobalSegment } from './ecommerceClientGlobalSegment.entity';
import { EcommerceUser } from './ecommerceUser.entity';

@Table({ paranoid: true, timestamps: true })
export class EcommerceOrderRule extends Model<EcommerceOrderRule> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true, allowNull: false })
  id: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  excludeSegmentation: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  excludeMetrics: boolean;

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @BelongsTo(() => EcommerceConnect)
  ecommerceConnect: EcommerceConnect;

  @ForeignKey(() => EcommerceUser)
  @ForeignKey(() => EcommerceClientGlobalSegment)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => EcommerceUser)
  user: EcommerceUser;
}
