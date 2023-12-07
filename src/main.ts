import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GqlAllExceptionsFilter } from 'bune-common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GqlAllExceptionsFilter());

  await app.listen(Bun.env.AUTH_PORT || 9696);
}
bootstrap();
