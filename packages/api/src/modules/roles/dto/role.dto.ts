import { IsNotEmpty } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  readonly label: string;
}
