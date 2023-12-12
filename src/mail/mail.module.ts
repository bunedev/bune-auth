import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigService } from './mail-config.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
