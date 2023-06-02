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
exports.ExplorerService = void 0;
const wallets_service_1 = require("./../wallet/wallets.service");
const count_entity_1 = require("./count.entity");
const transaction_entity_1 = require("./transaction.entity");
const block_list_entity_1 = require("./block-list.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ExplorerService = class ExplorerService {
    constructor(blockListRepository, transactionRepository, countRepository, walletService) {
        this.blockListRepository = blockListRepository;
        this.transactionRepository = transactionRepository;
        this.countRepository = countRepository;
        this.walletService = walletService;
        this.logger = new common_1.Logger();
    }
    async getBlockList(take = 20, after, skip = 0) {
        const condition = {
            take: take + 1,
            order: {
                height: 'DESC'
            }
        };
        const latestObj = await this.blockListRepository.findOne({
            select: ['id'],
            where: { id: (0, typeorm_2.MoreThan)(0) },
            order: {
                id: 'DESC'
            }
        });
        if (!latestObj)
            return null;
        const totalBlock = latestObj.id;
        if (skip > 0) {
            condition.where = { id: (0, typeorm_2.LessThanOrEqual)(totalBlock - skip) };
        }
        if (after) {
            const height = Number(Buffer.from(after, 'base64').toString('ascii'));
            this.logger.debug('decode from base64:' + height);
            condition.where[height] = (0, typeorm_2.LessThan)(height);
        }
        let blockList = await this.blockListRepository.find(condition);
        let hasNextPage = false;
        if (blockList.length > take) {
            hasNextPage = true;
            blockList = blockList.slice(0, take);
        }
        return [hasNextPage, totalBlock, blockList];
    }
    async getTransactions(take = 20, after, skip = 0, blockHeight = 0) {
        const condition = {
            take: take + 1,
            where: {},
            order: {
                id: 'DESC'
            }
        };
        if (blockHeight) {
            condition.where['height'] = blockHeight;
        }
        if (after) {
            const id = Number(Buffer.from(after, 'base64').toString('ascii'));
            this.logger.debug('decode from base64:' + id);
            condition.where['id'] = (0, typeorm_2.LessThan)(id);
        }
        let totalBlock = 0;
        if (blockHeight) {
            totalBlock = await this.transactionRepository.count({
                where: {
                    height: blockHeight
                }
            });
        }
        else {
            totalBlock = (await this.transactionRepository.findOne({
                select: ['id'],
                where: { id: (0, typeorm_2.MoreThan)(0) },
                order: {
                    id: 'DESC'
                }
            })).id;
        }
        if (skip > 0) {
            condition.where = { id: (0, typeorm_2.LessThanOrEqual)(totalBlock - skip) };
        }
        let blockList = await this.transactionRepository.find(condition);
        let hasNextPage = false;
        if (blockList.length > take) {
            hasNextPage = true;
            blockList = blockList.slice(0, take);
        }
        return [hasNextPage, totalBlock, blockList];
    }
    async getBlockInfo(heightOrHash) {
        if (isNaN(Number(String(heightOrHash).replace('0x', '')))) {
            if (String(heightOrHash).length < 64)
                return false;
            return await this.blockListRepository.findOne({
                where: { block_hash: String(heightOrHash) }
            });
        }
        else {
            return await this.blockListRepository.findOne({
                where: { height: Number(heightOrHash) }
            });
        }
    }
    async getTransactionInfo(hash) {
        if (hash.length < 64)
            return false;
        return await this.transactionRepository.findOne({
            where: { tx_hash: hash }
        });
    }
    async getAccount(walletAddress) {
        if (walletAddress.length < 42)
            return false;
        return await this.walletService.getWalletByAddress(walletAddress.toLowerCase());
    }
    async getAccountTransactions(walletAddress, take, skip) {
        const wallet = await this.walletService.getWalletByAddress(walletAddress);
        if (!wallet)
            return null;
        const txs = JSON.parse(wallet.txs_hash_list);
        if (txs.length <= take) {
            const txnObjects = await this.transactionRepository.find({
                where: { tx_hash: (0, typeorm_2.In)(txs) }
            });
            return {
                wallet: wallet,
                txs: txnObjects,
                total: txs.length
            };
        }
        else {
            const start = skip;
            const end = skip + take;
            const txnObjects = await this.transactionRepository.find({
                where: { tx_hash: (0, typeorm_2.In)(txs.slice(start, end)) }
            });
            return {
                wallet: wallet,
                txs: txnObjects,
                total: txs.length
            };
        }
    }
};
ExplorerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(block_list_entity_1.BlokcListEntity, 'explorer')),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.TransactionEntity, 'explorer')),
    __param(2, (0, typeorm_1.InjectRepository)(count_entity_1.CountEntity, 'explorer')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        wallets_service_1.WalletService])
], ExplorerService);
exports.ExplorerService = ExplorerService;
//# sourceMappingURL=explorer.service.js.map