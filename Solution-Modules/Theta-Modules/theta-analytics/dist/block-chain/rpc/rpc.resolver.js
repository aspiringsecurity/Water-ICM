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
exports.RpcResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const rpc_service_1 = require("./rpc.service");
const graphql_2 = require("graphql");
const rpc_model_1 = require("./rpc.model");
let RpcResolver = class RpcResolver {
    constructor(rpcService) {
        this.rpcService = rpcService;
    }
    async ThetaRpc(context) {
        return {};
    }
    async GetVersion() {
        return await this.rpcService.getVersion();
    }
    async GetAccount(address) {
        return await this.rpcService.getAccount(address);
    }
    async GetBlock(hash) {
        return await this.rpcService.getAccountByHash(hash);
    }
    async GetBlockByHeight(height) {
        if (!height)
            height = Number((await this.rpcService.getStatus()).latest_finalized_block_height);
        return await this.rpcService.getBlockByHeight(height);
    }
    async GetStatus() {
        return await this.rpcService.getStatus();
    }
    async GetTransaction(hash) {
        return await this.rpcService.getTransactionByHash(hash);
    }
    async GetVcpByHeight(height) {
        if (!height)
            height = Number((await this.rpcService.getStatus()).latest_finalized_block_height);
        return await this.rpcService.getVcpByHeight(height);
    }
    async GetGcpByHeight(height) {
        if (!height)
            height = Number((await this.rpcService.getStatus()).latest_finalized_block_height);
        return await this.rpcService.getGcpByHeight(height);
    }
    async GetEenpByHeight(height) {
        if (!height)
            height = Number((await this.rpcService.getStatus()).latest_finalized_block_height);
        return await this.rpcService.getEenpByHeight(height);
    }
    async GetPendingTransactions() {
        return await this.rpcService.getPendingTransactions();
    }
    async GetStakeRewardDistributionByHeight(height) {
        if (!height)
            height = Number((await this.rpcService.getStatus()).latest_finalized_block_height);
        return await this.rpcService.getStakeRewardDistributionByHeight(height);
    }
};
__decorate([
    (0, graphql_1.Query)(() => rpc_model_1.ThetaRpcModel),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "ThetaRpc", null);
__decorate([
    (0, graphql_1.ResolveField)(() => rpc_model_1.GetVersionModel, {
        description: 'This field returns the version of the blockchain software.\n' + '\n'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetVersion", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('address', { type: () => graphql_2.GraphQLString })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetAccount", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('hash', { type: () => graphql_2.GraphQLString })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetBlock", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('height', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetBlockByHeight", null);
__decorate([
    (0, graphql_1.ResolveField)(() => rpc_model_1.NodeStatusModel, { description: '' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetStatus", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('hash', { type: () => graphql_2.GraphQLString })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetTransaction", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('height', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetVcpByHeight", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('height', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetGcpByHeight", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('height', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetEenpByHeight", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetPendingTransactions", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('height', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RpcResolver.prototype, "GetStakeRewardDistributionByHeight", null);
RpcResolver = __decorate([
    (0, graphql_1.Resolver)((of) => rpc_model_1.ThetaRpcModel),
    __metadata("design:paramtypes", [rpc_service_1.RpcService])
], RpcResolver);
exports.RpcResolver = RpcResolver;
//# sourceMappingURL=rpc.resolver.js.map