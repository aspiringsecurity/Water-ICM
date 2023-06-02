"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyseWalletDpWdHistoryBootstrap = void 0;
const wallet_dp_wd_history_module_1 = require("./../block-chain/wallet-tx-history/deposit-withdraw/wallet-dp-wd-history.module");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const const_1 = require("../const");
const wallet_dp_wd_history_analyse_service_1 = require("../block-chain/wallet-tx-history/deposit-withdraw/wallet-dp-wd-history-analyse.service");
async function analyseWalletDpWdHistoryBootstrap() {
    let i = 0;
    while (1) {
        const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
        const service = app
            .select(wallet_dp_wd_history_module_1.WalletDpWdHistoryModule)
            .get(wallet_dp_wd_history_analyse_service_1.WalletDpWdHistoryAnalyseService, { strict: true });
        await service.analyse();
        await new Promise((resolve) => setTimeout(resolve, const_1.config.get('WALLET_DP_WD_HISTORY.ANALYSE_INTERVAL')));
        app.close();
        i++;
    }
}
exports.analyseWalletDpWdHistoryBootstrap = analyseWalletDpWdHistoryBootstrap;
//# sourceMappingURL=analyse-wallet-dp-wd-history.js.map