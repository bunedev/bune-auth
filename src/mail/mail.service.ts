import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { MailData } from './interfaces/mail-data.interface';
import { CACHE_TTL } from 'bune-common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async userRegister(mailData: MailData<{ code: string; subject: string }>) {
    await this.mailerService
      .sendMail({
        to: mailData.to,
        subject: mailData.data.subject,
        template: 'default',
        context: {
          otp: `${mailData.data.code}`,
          exp: CACHE_TTL.FIVE_MINUTES / 60,
        },
      })
      .catch((err) => {
        console.log(err);
        this.logger.error(`Failed to send email to ${mailData.to}`, err);
      });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>) {
    await this.mailerService
      .sendMail({
        to: mailData.to,
        subject: 'VDONE MAIL',
        template: 'reset-password',
        context: {
          otp: `${mailData.data.hash}`,
          exp: '5 minutes',
        },
      })
      .catch((err) => {
        this.logger.error(`Failed to send email to ${mailData.to}`, err);
      });
  }
}
