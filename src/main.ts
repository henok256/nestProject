import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.setGlobalPrefix('api')

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for testing the endpoints')
    .setVersion('1.0')
    .addTag('users') // Add tags for grouping endpoints
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Serve Swagger at /api

  await app.listen(process.env.PORT || 3000);
};
bootstrap();
