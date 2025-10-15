import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { noSpecialRegex, letterAndDigitRegex } from '@utils/regex';
import { Observable } from 'rxjs';

@Injectable()
export class IsPasswordValid implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const { password } = request.body;
    const result =
      letterAndDigitRegex.test(password) &&
      noSpecialRegex.test(password) &&
      password.length >= 6 &&
      password.length <= 12;
    if (!result) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'PASSWORD_ONLY_ALPHANUMERIC_ERROR',
        error: 'Bad Request',
        field: 'password',
      });
    }
    return result;
  }
}
