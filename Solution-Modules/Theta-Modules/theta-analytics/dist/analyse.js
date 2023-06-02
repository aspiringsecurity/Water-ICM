"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyseBootstrap = void 0;
const wallet_dp_wd_history_analyse_service_1 = require("./block-chain/wallet-tx-history/deposit-withdraw/wallet-dp-wd-history-analyse.service");
const wallet_dp_wd_history_module_1 = require("./block-chain/wallet-tx-history/deposit-withdraw/wallet-dp-wd-history.module");
const wallet_send_history_analyse_service_1 = require("./block-chain/wallet-tx-history/send/wallet-send-history-analyse.service");
const wallet_send_history_module_1 = require("./block-chain/wallet-tx-history/send/wallet-send-history.module");
const stake_analyse_service_1 = require("./block-chain/stake/stake-analyse.service");
const stake_module_1 = require("./block-chain/stake/stake.module");
const wallets_analyse_service_1 = require("./block-chain/wallet/wallets-analyse.service");
const smart_contract_analyse_service_1 = require("./block-chain/smart-contract/smart-contract-analyse.service");
const smart_contract_module_1 = require("./block-chain/smart-contract/smart-contract.module");
const nft_analyse_service_1 = require("./block-chain/smart-contract/nft/nft-analyse.service");
const nft_module_1 = require("./block-chain/smart-contract/nft/nft.module");
const nft_statistics_analyse_service_1 = require("./statistics/nft/nft-statistics-analyse.service");
const nft_statistics_module_1 = require("./statistics/nft/nft-statistics.module");
const explorer_analyse_service_1 = require("./block-chain/explorer/explorer-analyse.service");
const explorer_module_1 = require("./block-chain/explorer/explorer.module");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const tx_analyse_service_1 = require("./block-chain/tx/tx-analyse.service");
const tx_module_1 = require("./block-chain/tx/tx.module");
const wallet_module_1 = require("./block-chain/wallet/wallet.module");
async function analyseBootstrap(except = []) {
    let i = 0;
    while (1) {
        const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
        const tx = app.select(tx_module_1.TxModule).get(tx_analyse_service_1.TxAnalyseService, { strict: true });
        const explorer = app.select(explorer_module_1.ExplorerModule).get(explorer_analyse_service_1.ExplorerAnalyseService, { strict: true });
        const smartContract = app
            .select(smart_contract_module_1.SmartContractModule)
            .get(smart_contract_analyse_service_1.SmartContractAnalyseService, { strict: true });
        const wallet = app.select(wallet_module_1.WalletModule).get(wallets_analyse_service_1.WalletsAnalyseService, { strict: true });
        const nft = app.select(nft_module_1.NftModule).get(nft_analyse_service_1.NftAnalyseService, { strict: true });
        const stake = app.select(stake_module_1.StakeModule).get(stake_analyse_service_1.StakeAnalyseService, { strict: true });
        const nftStatistics = app
            .select(nft_statistics_module_1.NftStatisticsModule)
            .get(nft_statistics_analyse_service_1.NftStatisticsAnalyseService, { strict: true });
        const walletSendHistory = app
            .select(wallet_send_history_module_1.WalletSendHistoryModule)
            .get(wallet_send_history_analyse_service_1.WalletSendHistoryAnalyseService, { strict: true });
        const walletDpWdHistory = app
            .select(wallet_dp_wd_history_module_1.WalletDpWdHistoryModule)
            .get(wallet_dp_wd_history_analyse_service_1.WalletDpWdHistoryAnalyseService, { strict: true });
        if (except && !except.includes('tx')) {
            await tx.analyse();
        }
        if (except && !except.includes('explorer')) {
            await explorer.analyse();
        }
        if (except && !except.includes('smartContract')) {
            await smartContract.analyse();
        }
        if (except && !except.includes('wallet')) {
            await wallet.analyse();
        }
        if (except && !except.includes('nft')) {
            await nft.analyse(i);
        }
        if (except && !except.includes('stake')) {
            await stake.analyse();
        }
        if (except && !except.includes('nft-statistics')) {
            await nftStatistics.analyse();
        }
        if (except && !except.includes('wallet-send-history')) {
            await walletSendHistory.analyse();
        }
        if (except && !except.includes('wallet-dp-wd-history')) {
            await walletDpWdHistory.analyse();
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        app.close();
        i++;
    }
}
exports.analyseBootstrap = analyseBootstrap;
//# sourceMappingURL=analyse.js.map