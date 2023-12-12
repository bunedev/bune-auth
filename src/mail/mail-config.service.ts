import { Injectable } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor() {}

  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: Bun.env.MAIL_HOST,
        port: Bun.env.MAIL_PORT,
        auth: {
          user: Bun.env.MAIL_USER,
          pass: Bun.env.MAIL_PASS,
        },
        requireTLS: true,
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: `${Bun.env.MAIL_FROM_NAME} ${Bun.env.MAIL_FROM_ADDRESS}`,
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    } as MailerOptions;
  }
}
