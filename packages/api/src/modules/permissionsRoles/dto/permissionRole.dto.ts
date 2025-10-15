import { IsNotEmpty, IsBoolean } from 'class-validator';

export class PermissionRoleDto {
  @IsBoolean()
  @IsNotEmpty()
  readonly enabled: boolean;
}
