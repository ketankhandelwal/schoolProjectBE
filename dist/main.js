"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const global_pipe_1 = require("./pipe/global/global.pipe");
const common_1 = require("@nestjs/common");
const global_middleware_1 = require("./middleware/global.middleware");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
var bodyParser = require('body-parser');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new global_pipe_1.GlobalPipe());
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(global_middleware_1.logger);
    app.use(bodyParser.urlencoded({
        extended: false,
        limit: "100mb",
    }));
    app.use(bodyParser.json({ limit: "100mb" }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Swagger APIS')
        .setDescription('Swagger APIS discussion')
        .setVersion('1.0')
        .addTag('swagger')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    app.useGlobalPipes(new global_pipe_1.GlobalPipe());
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(global_middleware_1.logger);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(Number(process.env.PORT) | 3005);
}
bootstrap();
//# sourceMappingURL=main.js.map