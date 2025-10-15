import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type MailContext = {
  [key: string]: string;
};

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async send(email: string, subject: string, template: string, context?: MailContext, attachments?: any) {
    await this.mailerService.sendMail({
      to: email,
      subject,
      template,
      context,
      attachments,
    });
  }
}
