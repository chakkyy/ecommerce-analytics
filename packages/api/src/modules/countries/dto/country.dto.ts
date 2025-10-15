import { IsNotEmpty } from 'class-validator';

export class CountryDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly code: string;
}
