import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersService } from '@modules/users/users.service';

@Injectable()
export class UserAlreadyExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    if (!request?.body?.email) return true;
    const userExist = await this.userService.findOneByEmail(request.body.email);
    if (userExist) {
      throw new ForbiddenException({
        statusCode: 403,
        message: 'EMAIL_ALREADY_REGISTERED_ERROR',
        error: 'Forbidden',
        field: 'email',
      });
    }
    return true;
  }
}
