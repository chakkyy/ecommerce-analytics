import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { onlyLettersRegex } from '@utils/regex';
import { Observable } from 'rxjs';

@Injectable()
export class AreNameAndLastnameValid implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const { firstName, lastName } = request.body;

    if (firstName.length > 0) {
      const firstNames = firstName.split(' ');
      firstNames.forEach(name => {
        if (!onlyLettersRegex.test(name)) {
          throw new BadRequestException({
            statusCode: 400,
            message: 'FIRSTNAME_ONLY_LETTERS_ERROR',
            error: 'Forbidden',
            field: 'firstName',
          });
        }
      });
    }

    if (lastName.length > 0) {
      const lastNames = lastName.split(' ');
      lastNames.forEach(lastName => {
        if (!onlyLettersRegex.test(lastName)) {
          throw new BadRequestException({
            statusCode: 400,
            message: 'LASTNAME_ONLY_LETTERS_ERROR',
            error: 'Forbidden',
            field: 'lastName',
          });
        }
      });
    }

    return true;
  }
}
