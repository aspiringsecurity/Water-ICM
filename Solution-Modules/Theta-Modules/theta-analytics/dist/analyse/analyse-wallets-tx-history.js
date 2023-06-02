"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_tx_history_analyse_service_1 = require("./../block-chain/wallet-tx-history/wallet-tx-history-analyse.service");
const wallet_tx_history_module_1 = require("./../block-chain/wallet-tx-history/wallet-tx-history.module");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const utils_service_1 = require("../common/utils.service");
const const_1 = require("../const");
async function bootstrap() {
    try {
        while (1) {
            const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
            const service = app
                .select(wallet_tx_history_module_1.WalletTxHistoryModule)
                .get(wallet_tx_history_analyse_service_1.WalletTxHistoryAnalyseService, { strict: true });
            await Promise.race([
                service.analyseData(),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('timeout');
                        console.log('analyse race timeout');
                    }, 1000 * 60 * 5);
                })
            ]);
            await new Promise((resolve) => setTimeout(resolve, const_1.config.get('WALLET-TX-HISTORY.ANALYSE_INTERVAL')));
            app.close();
        }
    }
    catch (e) {
        console.log(e);
        (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('WALLET-TX-HISTORY.MONITOR_PATH'));
        process.exit();
    }
}
bootstrap();
//# sourceMappingURL=analyse-wallets-tx-history.js.map