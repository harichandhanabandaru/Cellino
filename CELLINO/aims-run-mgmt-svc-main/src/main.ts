import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableVersioning();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Run-Management")
    .setDescription("Swagger Documentation for Run management service")
    .setVersion("1.0")
    .addServer(process.env.ENVIRONMENT === "local" ? "" : "/run-mgmt-svc")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("swagger-ui", app, document);
  const config = app.get(ConfigService);
  await app.listen(config.get<string>("APP_PORT"), "0.0.0.0");
}

bootstrap();
