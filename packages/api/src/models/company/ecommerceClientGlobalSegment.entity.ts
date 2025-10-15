import { GlobalSegments } from '@models/company/globalSegments.entity';
import { Table, Column, Model, ForeignKey, BelongsTo, DataType, HasMany, PrimaryKey } from 'sequelize-typescript';
import { EcommerceConnect } from '@models/company/ecommerceConnect.entity';
import { EcommerceOrder } from './ecommerceOrder.entity';
import { EcommerceUser } from './ecommerceUser.entity';

@Table({ timestamps: true })
export class EcommerceClientGlobalSegment extends Model<EcommerceClientGlobalSegment> {
  @PrimaryKey
  @ForeignKey(() => EcommerceUser)
  @Column({ type: DataType.INTEGER, allowNull: false })
  clientId: number;

  @BelongsTo(() => EcommerceUser)
  user: EcommerceUser;

  @HasMany(() => EcommerceOrder)
  orders: EcommerceOrder[];

  @ForeignKey(() => EcommerceConnect)
  @Column({ type: DataType.INTEGER })
  ecommerceConnectId: number;

  @ForeignKey(() => GlobalSegments)
  @Column({ type: DataType.INTEGER })
  globalSegmentId: number;

  @BelongsTo(() => GlobalSegments)
  globalSegment: GlobalSegments;
}
