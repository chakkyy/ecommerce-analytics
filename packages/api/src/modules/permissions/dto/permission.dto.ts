import { IsNotEmpty } from 'class-validator';

export class PermissionDto {
  @IsNotEmpty()
  readonly target: string;
}
