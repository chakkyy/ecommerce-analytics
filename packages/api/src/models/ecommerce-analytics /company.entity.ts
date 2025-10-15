import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from '@models/ecommerce-analytics /user.entity';
import { Country } from '@models/ecommerce-analytics /country.entity';
import { Sector } from '@models/ecommerce-analytics /sector.entity';

@Table({ paranoid: true, timestamps: true })
export class Company extends Model<Company> {
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  businessName: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  employeesNumber: string;

  @Column({ type: DataType.STRING })
  logo: string;

  @Column({ type: DataType.STRING })
  database: string;

  @ForeignKey(() => Country)
  @Column({ type: DataType.INTEGER })
  countryId: number;

  @BelongsTo(() => Country)
  country: Country;

  @ForeignKey(() => Sector)
  @Column({ type: DataType.INTEGER })
  sectorId: number;

  @BelongsTo(() => Sector)
  sector: Sector;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
