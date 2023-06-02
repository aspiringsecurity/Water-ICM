"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_service_1 = require("../common/utils.service");
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const nft_statistics_analyse_service_1 = require("../statistics/nft/nft-statistics-analyse.service");
const nft_statistics_module_1 = require("../statistics/nft/nft-statistics.module");
const const_1 = require("../const");
async function bootstrap() {
    try {
        while (1) {
            const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
            const service = app
                .select(nft_statistics_module_1.NftStatisticsModule)
                .get(nft_statistics_analyse_service_1.NftStatisticsAnalyseService, { strict: true });
            console.log('do while');
            await Promise.race([
                service.analyse(),
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve('timeout');
                        console.log('analyse race timeout');
                    }, 1000 * 60 * 5);
                })
            ]);
            console.log('finish');
            await new Promise((resolve) => setTimeout(resolve, const_1.config.get('NFT_STATISTICS.ANALYSE_INTERVAL')));
            app.close();
            console.log('app close');
        }
    }
    catch (e) {
        (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('NFT_STATISTICS.MONITOR_PATH'));
        console.log(e);
        process.exit();
    }
}
bootstrap();
//# sourceMappingURL=analyse-nft-statistics.js.map