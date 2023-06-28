import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );  
  app.enableVersioning();
    
  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('User-Management')
    .setDescription('Swagger Documentation for User management service')
    .setVersion('1.0')
    .addServer('/user-mgmt-svc')
    .build();
  
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger-ui', app, document);
  
  const configService = app.get(ConfigService);
  await app.listen(configService.get<string>('APP_PORT'), '0.0.0.0');
}
bootstrap();
