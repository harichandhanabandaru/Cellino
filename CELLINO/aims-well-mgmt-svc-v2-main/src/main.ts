import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { Vertice } from "./dto/vertice.dto";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 10485760 })
  );

  app.enableVersioning();

  const config = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Well Management")
    .setDescription("Swagger Documentation for Well management service")
    .setVersion("1.0")
    .addServer(process.env.ENVIRONMENT === "local" ? "" : "/well-mgmt-svc")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [Vertice],
  });
  SwaggerModule.setup("swagger-ui", app, document);
  await app.listen(config.get<string>("APP_PORT"), "0.0.0.0");
}
bootstrap();
