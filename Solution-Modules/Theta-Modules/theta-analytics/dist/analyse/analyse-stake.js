"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_service_1 = require("../common/utils.service");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const stake_analyse_service_1 = require("../block-chain/stake/stake-analyse.service");
const stake_module_1 = require("../block-chain/stake/stake.module");
const const_1 = require("../const");
async function bootstrap() {
    try {
        while (1) {
            const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
            const service = app.select(stake_module_1.StakeModule).get(stake_analyse_service_1.StakeAnalyseService, { strict: true });
            await Promise.race([
                service.analyse(),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('timeout');
                        console.log('analyse race timeout');
                    }, 1000 * 60 * 5);
                })
            ]);
            await new Promise((resolve) => setTimeout(resolve, const_1.config.get('STAKE.ANALYSE_INTERVAL')));
            app.close();
        }
    }
    catch (e) {
        (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('STAKE.MONITOR_PATH'));
        console.log(e);
        process.exit();
    }
}
bootstrap();
//# sourceMappingURL=analyse-stake.js.map