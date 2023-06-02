"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_service_1 = require("../common/utils.service");
const explorer_analyse_service_1 = require("./../block-chain/explorer/explorer-analyse.service");
const explorer_module_1 = require("./../block-chain/explorer/explorer.module");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const const_1 = require("../const");
async function bootstrap() {
    try {
        while (1) {
            const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
            const service = app.select(explorer_module_1.ExplorerModule).get(explorer_analyse_service_1.ExplorerAnalyseService, { strict: true });
            await Promise.race([
                service.analyse(),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('timeout');
                        console.log('analyse race timeout');
                    }, 1000 * 60 * 5);
                })
            ]);
            await new Promise((resolve) => setTimeout(resolve, const_1.config.get('EXPLORER.ANALYSE_INTERVAL')));
            app.close();
        }
    }
    catch (e) {
        console.log(e);
        (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('EXPLORER.MONITOR_PATH'));
        process.exit();
    }
}
bootstrap();
//# sourceMappingURL=analyse-explorer.js.map