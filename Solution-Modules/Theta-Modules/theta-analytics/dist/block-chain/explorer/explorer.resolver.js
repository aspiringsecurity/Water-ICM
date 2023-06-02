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
exports.ExplorerResolver = void 0;
const nft_statistics_service_1 = require("./../../statistics/nft/nft-statistics.service");
const nft_service_1 = require("../smart-contract/nft/nft.service");
const smart_contract_service_1 = require("../smart-contract/smart-contract.service");
const utils_service_1 = require("./../../common/utils.service");
const explorer_service_1 = require("./explorer.service");
const explorer_model_1 = require("./explorer.model");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const rpc_service_1 = require("../rpc/rpc.service");
let ExplorerResolver = class ExplorerResolver {
    constructor(explorerService, rpcService, utilService, smartContractService, nftService, nftStatisticsService) {
        this.explorerService = explorerService;
        this.rpcService = rpcService;
        this.utilService = utilService;
        this.smartContractService = smartContractService;
        this.nftService = nftService;
        this.nftStatisticsService = nftStatisticsService;
    }
    async Explorer(context) {
        return {};
    }
    async blockList(take, after, skip) {
        const [hasNextPage, totalNumber, res] = await this.explorerService.getBlockList(take, after, skip);
        let endCursor = '';
        if (res.length > 0) {
            endCursor = Buffer.from(res[res.length - 1].height.toString()).toString('base64');
        }
        return {
            endCursor: endCursor,
            hasNextPage: hasNextPage,
            nodes: res,
            skip: skip,
            totalCount: totalNumber
        };
    }
    async transactions(take, blockHeight, after, skip) {
        const [hasNextPage, totalNumber, res] = await this.explorerService.getTransactions(take, after, skip, blockHeight);
        let endCursor = '';
        if (res.length > 0) {
            endCursor = Buffer.from(res[res.length - 1].id.toString()).toString('base64');
        }
        return {
            endCursor: endCursor,
            hasNextPage: hasNextPage,
            nodes: res,
            skip: skip,
            totalCount: totalNumber
        };
    }
    async search(search) {
        const blockInfo = await this.explorerService.getBlockInfo(search);
        if (blockInfo) {
            const res = await this.rpcService.getBlockByHeight(blockInfo.height);
            return { block: res, block_extend: blockInfo, search_type: explorer_model_1.SEARCH_TYPE_ENUM.block };
        }
        const accountInfo = await this.explorerService.getAccount(search);
        if (accountInfo) {
            return {
                search_type: explorer_model_1.SEARCH_TYPE_ENUM.account
            };
        }
        const transactionInfo = await this.explorerService.getTransactionInfo(search);
        if (transactionInfo) {
            const transactionRpc = await this.rpcService.getTransactionByHash(search);
            return {
                transaction: transactionInfo,
                transaction_rpc: transactionRpc,
                search_type: explorer_model_1.SEARCH_TYPE_ENUM.transaction
            };
        }
        const [hasNextPage, totalNum, nftList] = await this.nftStatisticsService.getNft(nft_statistics_service_1.NftStatisticsOrderByType.last_24_h_users, 100, undefined, 0, search);
        if (nftList.length > 0) {
            return {
                search_type: explorer_model_1.SEARCH_TYPE_ENUM.nft,
                nft_statistics: nftList,
                total: totalNum
            };
        }
        return {
            search_type: explorer_model_1.SEARCH_TYPE_ENUM.none
        };
    }
};
__decorate([
    (0, graphql_1.Query)(() => explorer_model_1.ExplorerModelType),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExplorerResolver.prototype, "Explorer", null);
__decorate([
    (0, graphql_1.ResolveField)(() => explorer_model_1.PaginatedBlockList),
    __param(0, (0, graphql_1.Args)('take', { type: () => graphql_2.GraphQLInt, defaultValue: 10 })),
    __param(1, (0, graphql_1.Args)('after', { nullable: true })),
    __param(2, (0, graphql_1.Args)('skip', { type: () => graphql_2.GraphQLInt, defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", Promise)
], ExplorerResolver.prototype, "blockList", null);
__decorate([
    (0, graphql_1.ResolveField)(() => explorer_model_1.PaginatedTransactions),
    __param(0, (0, graphql_1.Args)('take', { type: () => graphql_2.GraphQLInt, defaultValue: 10 })),
    __param(1, (0, graphql_1.Args)('block_height', { type: () => graphql_2.GraphQLInt, defaultValue: 0, nullable: true })),
    __param(2, (0, graphql_1.Args)('after', { nullable: true })),
    __param(3, (0, graphql_1.Args)('skip', { type: () => graphql_2.GraphQLInt, defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number]),
    __metadata("design:returntype", Promise)
], ExplorerResolver.prototype, "transactions", null);
__decorate([
    (0, graphql_1.ResolveField)(() => explorer_model_1.ExplorerSearchModelType),
    __param(0, (0, graphql_1.Args)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExplorerResolver.prototype, "search", null);
ExplorerResolver = __decorate([
    (0, graphql_1.Resolver)((of) => explorer_model_1.ExplorerModelType),
    __metadata("design:paramtypes", [explorer_service_1.ExplorerService,
        rpc_service_1.RpcService,
        utils_service_1.UtilsService,
        smart_contract_service_1.SmartContractService,
        nft_service_1.NftService,
        nft_statistics_service_1.NftStatisticsService])
], ExplorerResolver);
exports.ExplorerResolver = ExplorerResolver;
//# sourceMappingURL=explorer.resolver.js.map