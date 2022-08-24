import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryFailedErrorFilter } from './shared/typeorm/query.failed.error.filter';
import { EntityNotFoundErrorFilter } from './shared/typeorm/entity.not.found.error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
      origin: process.env.CORS_ALLOW_ORIGIN,
      credentials: true,
    }, });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new QueryFailedErrorFilter(httpAdapter));
  app.useGlobalFilters(new EntityNotFoundErrorFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
