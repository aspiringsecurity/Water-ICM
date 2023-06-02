"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftAnalyseService = void 0;
const smart_contract_call_log_entity_1 = require("./../smart-contract-call-log.entity");
const nft_retrive_entity_1 = require("./nft-retrive.entity");
const smart_contract_entity_1 = require("../smart-contract.entity");
const nft_transfer_record_entity_1 = require("./nft-transfer-record.entity");
const nft_balance_entity_1 = require("./nft-balance.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const nft_service_1 = require("./nft.service");
const utils_service_1 = require("../../../common/utils.service");
const const_1 = require("../../../const");
const typeorm_2 = require("@nestjs/typeorm");
const fs = require('fs');
let NftAnalyseService = class NftAnalyseService {
    constructor(nftService, utilsService, smartContractConnectionInjected, nftConnectionInjected) {
        this.nftService = nftService;
        this.utilsService = utilsService;
        this.smartContractConnectionInjected = smartContractConnectionInjected;
        this.nftConnectionInjected = nftConnectionInjected;
        this.logger = new common_1.Logger('nft analyse service');
        this.analyseKey = 'under_analyse';
        this.heightConfigFile = const_1.config.get('ORM_CONFIG')['database'] + 'nft/record.height';
        this.retriveIdFile = const_1.config.get('ORM_CONFIG')['database'] + 'nft/retrive.id';
        this.imgPathRestoreId = const_1.config.get('ORM_CONFIG')['database'] + 'nft/img-path-restore.id';
    }
    async analyse(loop) {
        try {
            this.logger.debug(loop + ' start analyse nft data');
            this.smartContractConnectionRunner = this.smartContractConnectionInjected.createQueryRunner();
            this.nftConnectionRunner = this.nftConnectionInjected.createQueryRunner();
            await this.nftConnectionRunner.startTransaction();
            let startId = 0;
            if (!fs.existsSync(this.heightConfigFile)) {
                fs.writeFileSync(this.heightConfigFile, '0');
            }
            else {
                const data = fs.readFileSync(this.heightConfigFile, 'utf8');
                if (data) {
                    startId = Number(data);
                }
            }
            const contractRecordList = await this.smartContractConnectionRunner.manager.find(smart_contract_call_log_entity_1.SmartContractCallLogEntity, {
                where: {
                    id: (0, typeorm_1.MoreThan)(startId)
                },
                take: const_1.config.get('NFT.ANALYSE_NUMBER'),
                order: { id: 'ASC' }
            });
            this.logger.debug('records length:' + contractRecordList.length);
            for (const record of contractRecordList) {
                await this.nftService.updateNftLog(this.nftConnectionRunner, this.smartContractConnectionRunner, record);
            }
            await this.retriveNfts();
            await this.autoRefetchTokenUri(loop);
            if (const_1.config.get('RESTORE_NFT_IMG_PATH')) {
                await this.restoreNftImgPath();
            }
            this.logger.debug('start update calltimes by period');
            await this.nftConnectionRunner.commitTransaction();
            if (contractRecordList.length > 0) {
                this.logger.debug('end height:' + Number(contractRecordList[contractRecordList.length - 1].height));
                this.utilsService.updateRecordHeight(this.heightConfigFile, contractRecordList[contractRecordList.length - 1].id);
            }
            (0, utils_service_1.writeSucessExcuteLog)(const_1.config.get('NFT.MONITOR_PATH'));
            this.logger.debug('commit success');
        }
        catch (e) {
            console.error(e.message);
            this.logger.error(e.message);
            this.logger.error('rollback');
            await this.nftConnectionRunner.rollbackTransaction();
            (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('NFT.MONITOR_PATH'));
        }
        finally {
            await this.nftConnectionRunner.release();
            this.logger.debug('end analyse nft data');
            this.logger.debug('release success');
        }
    }
    async autoRefetchTokenUri(loop) {
        const pageSize = 100;
        if ((loop * pageSize) % 100000 == 0) {
            const latestNftRecord = await this.nftConnectionRunner.manager.findOne(nft_balance_entity_1.NftBalanceEntity, {
                where: { id: (0, typeorm_1.MoreThan)(0) },
                order: {
                    id: 'DESC'
                }
            });
            if (!latestNftRecord)
                fs.writeFileSync(this.retriveIdFile, '0');
            else
                fs.writeFileSync(this.retriveIdFile, latestNftRecord.id.toString());
        }
        const startId = Number(fs.readFileSync(this.retriveIdFile, 'utf8'));
        const list = await this.nftConnectionRunner.manager.find(nft_balance_entity_1.NftBalanceEntity, {
            where: { id: (0, typeorm_1.LessThan)(startId) },
            take: pageSize,
            order: {
                id: 'DESC'
            }
        });
        for (const item of list) {
            this.logger.debug('start download ' + item.id + ' ' + item.name);
            if (item.refetch_times >= 3)
                continue;
            try {
                const res = await this.utilsService.getJsonRes(item.token_uri);
                this.logger.debug(res);
                item.detail = JSON.stringify(res);
                item.name = res.name;
                item.refetch_times = item.refetch_times + 1;
                if (this.utilsService.getPath(res.image, const_1.config.get('NFT.STATIC_PATH')) != item.img_uri) {
                    item.img_uri = await this.utilsService.downloadImage(res.image, const_1.config.get('NFT.STATIC_PATH'));
                }
                this.logger.debug('end get token uri ' + item.img_uri);
            }
            catch (e) {
                this.logger.error(e);
            }
            await this.nftConnectionRunner.manager.save(item);
            await this.nftConnectionRunner.manager.update(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                smart_contract_address: item.smart_contract_address,
                token_id: item.token_id
            }, { img_uri: item.img_uri, name: item.name });
        }
        if (list.length > 0)
            fs.writeFileSync(this.retriveIdFile, list[list.length - 1].id.toString());
    }
    async retriveNfts() {
        const moment = require('moment');
        const smartContracts = await this.smartContractConnectionRunner.manager.find(smart_contract_entity_1.SmartContractEntity, {
            where: {
                verification_date: (0, typeorm_1.MoreThan)(moment().subtract(1, 'days').unix())
            }
        });
        for (const contract of smartContracts) {
            const retrived = await this.nftConnectionRunner.manager.findOne(nft_retrive_entity_1.NftRetriveEntity, {
                where: {
                    smart_contract_address: contract.contract_address
                },
                order: { id: 'ASC' }
            });
            if (retrived) {
                continue;
            }
            const allNftRecords = await this.smartContractConnectionRunner.manager.find(smart_contract_call_log_entity_1.SmartContractCallLogEntity, {
                where: {
                    address: contract.contract_address,
                    timestamp: (0, typeorm_1.LessThan)(contract.verification_date + 10 * 60)
                },
                order: {
                    id: 'ASC'
                }
            });
            for (const record of allNftRecords) {
                await this.nftService.updateNftLog(this.nftConnectionRunner, this.smartContractConnectionRunner, record);
            }
            const retrive = new nft_retrive_entity_1.NftRetriveEntity();
            retrive.smart_contract_address = contract.contract_address;
            retrive.retrived = true;
            await this.nftConnectionRunner.manager.save(retrive);
        }
    }
    async restoreNftImgPath() {
        const startId = this.utilsService.getRecordHeight(this.imgPathRestoreId);
        const nftList = await this.nftConnectionRunner.manager.find(nft_balance_entity_1.NftBalanceEntity, {
            where: {
                id: (0, typeorm_1.MoreThanOrEqual)(startId)
            },
            take: 5000,
            order: {
                id: 'ASC'
            }
        });
        this.logger.debug('nft img to restore:' + nftList.length);
        if (nftList.length == 0)
            return;
        for (const nft of nftList) {
            if (nft.detail) {
                const nftDetail = JSON.parse(nft.detail);
                nft.img_uri = nftDetail.image;
            }
            else {
                try {
                    const res = await this.utilsService.getJsonRes(nft.token_uri);
                    this.logger.debug(res);
                    nft.detail = JSON.stringify(res);
                    nft.name = res.name;
                    nft.img_uri = await this.utilsService.downloadImage(res.image, const_1.config.get('NFT.STATIC_PATH'));
                }
                catch (e) {
                    this.logger.error(e);
                }
            }
            await this.nftConnectionRunner.manager.save(nft);
            await this.nftConnectionRunner.manager.update(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                smart_contract_address: nft.smart_contract_address,
                token_id: nft.token_id
            }, { img_uri: nft.img_uri });
        }
        this.utilsService.updateRecordHeight(this.imgPathRestoreId, nftList[nftList.length - 1].id);
    }
};
NftAnalyseService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectDataSource)('smart_contract')),
    __param(3, (0, typeorm_2.InjectDataSource)('nft')),
    __metadata("design:paramtypes", [nft_service_1.NftService,
        utils_service_1.UtilsService,
        typeorm_1.DataSource,
        typeorm_1.DataSource])
], NftAnalyseService);
exports.NftAnalyseService = NftAnalyseService;
//# sourceMappingURL=nft-analyse.service.js.map