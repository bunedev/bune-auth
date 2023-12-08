import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GqlAllExceptionsFilter, GqlValidationPipe } from 'bune-common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GqlAllExceptionsFilter());
  app.useGlobalPipes(new GqlValidationPipe());

  await app.listen(Bun.env.AUTH_PORT || 9696);
}
bootstrap();
