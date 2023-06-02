"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyseWalletSendHistoryBootstrap = void 0;
const wallet_send_history_module_1 = require("./../block-chain/wallet-tx-history/send/wallet-send-history.module");
const wallet_send_history_analyse_service_1 = require("../block-chain/wallet-tx-history/send/wallet-send-history-analyse.service");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const const_1 = require("../const");
async function analyseWalletSendHistoryBootstrap() {
    let i = 0;
    while (1) {
        const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
        const service = app
            .select(wallet_send_history_module_1.WalletSendHistoryModule)
            .get(wallet_send_history_analyse_service_1.WalletSendHistoryAnalyseService, { strict: true });
        await service.analyse();
        await new Promise((resolve) => setTimeout(resolve, const_1.config.get('WALLET_SEND_HISTORY.ANALYSE_INTERVAL')));
        app.close();
        i++;
    }
}
exports.analyseWalletSendHistoryBootstrap = analyseWalletSendHistoryBootstrap;
//# sourceMappingURL=analyse-wallet-send-history.js.map