import { NestFactory } from '@nestjs/core';
import {GlobalPipe} from './pipe/global/global.pipe'
import {ValidationPipe} from '@nestjs/common';
import {logger} from './middleware/global.middleware';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
var bodyParser = require('body-parser')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new GlobalPipe())
app.enableCors();
app.useGlobalPipes(new ValidationPipe());
app.use(logger);
app.use(bodyParser.urlencoded(
  {
      extended: false,
      limit: "100mb",
  },
));
app.use(bodyParser.json({ limit: "100mb" })); 
const config = new DocumentBuilder()
    .setTitle('Swagger APIS')
    .setDescription('Swagger APIS discussion')
    .setVersion('1.0')
    .addTag('swagger')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
app.useGlobalPipes(new GlobalPipe())
app.enableCors();
app.useGlobalPipes(new ValidationPipe());
app.use(logger);
  SwaggerModule.setup('api', app, document);
  await app.listen(Number(process.env.PORT)|3005);
}
bootstrap();
