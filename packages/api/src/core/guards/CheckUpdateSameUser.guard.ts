import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { onlyLettersRegex } from '@utils/regex';
import { noSpecialRegex, letterAndDigitRegex } from '@utils/regex';
import { Observable } from 'rxjs';

@Injectable()
export class CheckUpdateSameUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const { password, firstName, lastName } = request.body;
    if (firstName && lastName) {
      const resultRegex = onlyLettersRegex.test(firstName) && onlyLettersRegex.test(lastName);
      if (!resultRegex) {
        throw new BadRequestException('firstName and lastName must be letters only');
      }
    }
    if (password) {
      const resultPasswordCheck =
        letterAndDigitRegex.test(password) &&
        noSpecialRegex.test(password) &&
        password.length >= 6 &&
        password.length <= 12;
      if (!resultPasswordCheck) {
        throw new BadRequestException('Password must be 6 to 12 alphanumeric long (no special characters)');
      }
    }
    return true;
  }
}
