"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const smart_contract_analyse_service_1 = require("../block-chain/smart-contract/smart-contract-analyse.service");
const smart_contract_module_1 = require("../block-chain/smart-contract/smart-contract.module");
const utils_service_1 = require("../common/utils.service");
const const_1 = require("../const");
async function bootstrap() {
    try {
        while (1) {
            const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
            const service = app
                .select(smart_contract_module_1.SmartContractModule)
                .get(smart_contract_analyse_service_1.SmartContractAnalyseService, { strict: true });
            await Promise.race([
                service.analyse(),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('timeout');
                        console.log('analyse race timeout');
                    }, 1000 * 60 * 5);
                })
            ]);
            await new Promise((resolve) => setTimeout(resolve, const_1.config.get('SMART_CONTRACT.ANALYSE_INTERVAL')));
            app.close();
        }
    }
    catch (e) {
        console.log(e);
        (0, utils_service_1.writeSucessExcuteLog)(const_1.config.get('SMART_CONTRACT.MONITOR_PATH'));
        process.exit();
    }
}
bootstrap();
//# sourceMappingURL=analyse-smart-contract.js.map