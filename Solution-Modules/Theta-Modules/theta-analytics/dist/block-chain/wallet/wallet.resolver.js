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
exports.WalletResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const wallet_model_1 = require("./wallet.model");
const graphql_2 = require("graphql");
const wallet_balance_model_1 = require("./wallet-balance.model");
const wallets_service_1 = require("./wallets.service");
let WalletResolver = class WalletResolver {
    constructor(walletService) {
        this.walletService = walletService;
    }
    Wallet() {
        return {};
    }
    async Balance(wallet_address) {
        const resInfo = await this.walletService.getALlBalance(wallet_address.toLocaleLowerCase());
        return resInfo;
    }
};
__decorate([
    (0, graphql_1.Query)(() => wallet_model_1.WalletModel),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WalletResolver.prototype, "Wallet", null);
__decorate([
    (0, graphql_1.ResolveField)(() => wallet_balance_model_1.BalanceModel),
    __param(0, (0, graphql_1.Args)('wallet_address', { type: () => graphql_2.GraphQLString })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletResolver.prototype, "Balance", null);
WalletResolver = __decorate([
    (0, graphql_1.Resolver)(() => wallet_model_1.WalletModel),
    __metadata("design:paramtypes", [wallets_service_1.WalletService])
], WalletResolver);
exports.WalletResolver = WalletResolver;
//# sourceMappingURL=wallet.resolver.js.map