"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bodyParser = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.set('trust proxy', true);
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        parameterLimit: 100000,
        extended: true
    }));
    console.log('listen:' + process.env.PORT);
    if (process.env.PORT)
        await app.listen(process.env.PORT);
    else
        await app.listen(3000);
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=serve.js.map