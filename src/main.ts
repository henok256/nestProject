import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  //app.useLogger(app.get(MyLoggerService))
  const {httpAdapter} =app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.enableCors()
  app.setGlobalPrefix('api')

  await app.listen(process.env.PORT || 3000);
};
bootstrap();
