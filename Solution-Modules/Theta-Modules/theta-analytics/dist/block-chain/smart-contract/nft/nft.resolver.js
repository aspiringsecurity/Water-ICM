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
exports.NftResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const nft_balance_entity_1 = require("./nft-balance.entity");
const nft_transfer_record_entity_1 = require("./nft-transfer-record.entity");
const nft_model_1 = require("./nft.model");
const nft_service_1 = require("./nft.service");
let NftResolver = class NftResolver {
    constructor(nftService) {
        this.nftService = nftService;
    }
    async Nfts() {
        return {};
    }
    async SearchNfts(name, take, after) {
        const [hasNextPage, totalNumber, res] = await this.nftService.findNftsByName(name, take, after);
        let endCursor = '';
        if (res.length > 0) {
            endCursor = Buffer.from(res[res.length - 1].id.toString()).toString('base64');
        }
        return {
            hasNextPage: hasNextPage,
            nodes: res,
            totalCount: totalNumber
        };
    }
    async Balance(walletAddress, search, take, skip, after) {
        const [hasNextPage, totalNumber, res] = await this.nftService.getNftByWalletAddress(walletAddress.toLowerCase(), take, after, skip, search);
        let endCursor = '';
        if (res.length > 0) {
            endCursor = Buffer.from(res[res.length - 1].id.toString()).toString('base64');
        }
        return {
            endCursor: endCursor,
            hasNextPage: hasNextPage,
            nodes: res,
            totalCount: totalNumber,
            skip: skip
        };
    }
    async NftsForContract(walletAddress, contractAddress, take, after) {
        const [hasNextPage, totalNumber, res] = await this.nftService.getNftsForContract(walletAddress.toLowerCase(), contractAddress.toLowerCase(), take, after);
        let endCursor = '';
        if (res.length > 0) {
            endCursor = Buffer.from(res[res.length - 1].id.toString()).toString('base64');
        }
        return {
            endCursor: endCursor,
            hasNextPage: hasNextPage,
            nodes: res,
            totalCount: totalNumber
        };
    }
    async NftTransfers(walletAddress, take, after) {
        const [hasNextPage, totalNumber, res] = await this.nftService.getNftTransfersByWallet(walletAddress.toLowerCase(), take, after);
        let endCursor = '';
        if (res.length > 0) {
            endCursor = Buffer.from(res[res.length - 1].id.toString()).toString('base64');
        }
        return {
            endCursor: endCursor,
            hasNextPage: hasNextPage,
            nodes: res,
            totalCount: totalNumber
        };
    }
    async NftTransfersByBlock(blockHeight) {
        return await this.nftService.getNftTransfersForBlockHeight(blockHeight);
    }
    async NftOwners(contractAddress, take, skip, after) {
        const [hasNextPage, totalNumber, res] = await this.nftService.getNftsBySmartContractAddress(contractAddress.toLowerCase(), take, after, skip);
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
    async ContractNftTransfers(contractAddress, tokenId, take, after, skip) {
        const [hasNextPage, totalNumber, res] = await this.nftService.getNftTransfersForSmartContract(contractAddress.toLowerCase(), tokenId, take, after, skip);
        let endCursor = '';
        if (res.length > 0) {
            endCursor = Buffer.from(res[res.length - 1].timestamp.toString()).toString('base64');
        }
        return {
            endCursor: endCursor,
            hasNextPage: hasNextPage,
            skip: skip,
            nodes: res,
            totalCount: totalNumber
        };
    }
    async TokenIdOwners(tokenId, contractAddress) {
        return await this.nftService.getNftByTokenId(tokenId, contractAddress.toLowerCase());
    }
};
__decorate([
    (0, graphql_1.Query)(() => nft_model_1.NftType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NftResolver.prototype, "Nfts", null);
__decorate([
    (0, graphql_1.ResolveField)(() => nft_model_1.PaginatedSmartContract, { nullable: true }),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, defaultValue: 10 })),
    __param(2, (0, graphql_1.Args)('after', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], NftResolver.prototype, "SearchNfts", null);
__decorate([
    (0, graphql_1.ResolveField)(() => nft_model_1.PaginatedNftBalance),
    __param(0, (0, graphql_1.Args)('wallet_address')),
    __param(1, (0, graphql_1.Args)('search', { nullable: true })),
    __param(2, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, defaultValue: 10 })),
    __param(3, (0, graphql_1.Args)('skip', { type: () => graphql_1.Int, defaultValue: 0 })),
    __param(4, (0, graphql_1.Args)('after', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], NftResolver.prototype, "Balance", null);
__decorate([
    (0, graphql_1.ResolveField)(() => nft_model_1.PaginatedNftBalance, { nullable: true }),
    __param(0, (0, graphql_1.Args)('wallet_address')),
    __param(1, (0, graphql_1.Args)('smart_contract_address')),
    __param(2, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, defaultValue: 10 })),
    __param(3, (0, graphql_1.Args)('after', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", Promise)
], NftResolver.prototype, "NftsForContract", null);
__decorate([
    (0, graphql_1.ResolveField)(() => nft_model_1.PaginatedNftTransferRecord),
    __param(0, (0, graphql_1.Args)('wallet_address')),
    __param(1, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, defaultValue: 10 })),
    __param(2, (0, graphql_1.Args)('after', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], NftResolver.prototype, "NftTransfers", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [nft_transfer_record_entity_1.NftTransferRecordEntity]),
    __param(0, (0, graphql_1.Args)('block_height', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NftResolver.prototype, "NftTransfersByBlock", null);
__decorate([
    (0, graphql_1.ResolveField)(() => nft_model_1.PaginatedNftBalance),
    __param(0, (0, graphql_1.Args)('smart_contract_address')),
    __param(1, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, defaultValue: 10 })),
    __param(2, (0, graphql_1.Args)('skip', { type: () => graphql_1.Int, defaultValue: 0 })),
    __param(3, (0, graphql_1.Args)('after', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], NftResolver.prototype, "NftOwners", null);
__decorate([
    (0, graphql_1.ResolveField)(() => nft_model_1.PaginatedNftTransferRecord),
    __param(0, (0, graphql_1.Args)('smart_contract_address')),
    __param(1, (0, graphql_1.Args)('token_id', { type: () => graphql_1.Int, nullable: true })),
    __param(2, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, defaultValue: 10 })),
    __param(3, (0, graphql_1.Args)('after', { nullable: true })),
    __param(4, (0, graphql_1.Args)('skip', { type: () => graphql_1.Int, defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String, Number]),
    __metadata("design:returntype", Promise)
], NftResolver.prototype, "ContractNftTransfers", null);
__decorate([
    (0, graphql_1.ResolveField)(() => nft_balance_entity_1.NftBalanceEntity),
    __param(0, (0, graphql_1.Args)('token_id', { defaultValue: 1, type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('contract_adress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], NftResolver.prototype, "TokenIdOwners", null);
NftResolver = __decorate([
    (0, graphql_1.Resolver)(() => nft_model_1.NftType),
    __metadata("design:paramtypes", [nft_service_1.NftService])
], NftResolver);
exports.NftResolver = NftResolver;
//# sourceMappingURL=nft.resolver.js.map