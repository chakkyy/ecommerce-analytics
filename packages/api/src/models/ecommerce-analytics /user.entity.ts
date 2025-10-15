import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';

import { Country } from '@models/ecommerce-analytics /country.entity';
import { Company } from '@models/ecommerce-analytics /company.entity';

@Table({ paranoid: true, timestamps: true })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'en',
  })
  locale: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  googleId: string;

  @ForeignKey(() => Country)
  @Column({ type: DataType.INTEGER })
  countryId: number;

  @BelongsTo(() => Country)
  country: Country;

  @HasMany(() => Company)
  companies: Company[];

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  validatedAt: Date;
}
