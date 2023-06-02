"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const tx_analyse_service_1 = require("../block-chain/tx/tx-analyse.service");
const tx_module_1 = require("../block-chain/tx/tx.module");
const utils_service_1 = require("../common/utils.service");
const const_1 = require("../const");
async function bootstrap() {
    try {
        while (1) {
            const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
            const service = app.select(tx_module_1.TxModule).get(tx_analyse_service_1.TxAnalyseService, { strict: true });
            await Promise.race([
                service.analyse(),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('timeout');
                        console.log('analyse race timeout');
                    }, 1000 * 60 * 5);
                })
            ]);
            await new Promise((resolve) => setTimeout(resolve, const_1.config.get('TX.ANALYSE_INTERVAL')));
            app.close();
        }
    }
    catch (e) {
        console.log(e);
        (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('TX.MONITOR_PATH'));
        process.exit();
    }
}
bootstrap();
//# sourceMappingURL=analyse-tx.js.map