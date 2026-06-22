import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProd = process.env.NODE_ENV === "production";
  const origin = isProd ? process.env.FRONTEND_URL : "http://localhost:5173";

  app.enableCors({
    origin,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const documentBuilderConfig = new DocumentBuilder()
    .setTitle("Casa Church")
    .setDescription(
      "API para gerenciamento e integração de dados da Casa Church, facilitando a administração de eventos, membros e recursos da comunidade."
    )
    .setVersion("1.0")
    .addApiKey(
      {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description: 'Informe apenas o token (sem "Bearer")',
      },
      "auth-token"
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilderConfig);
  SwaggerModule.setup("docs", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
