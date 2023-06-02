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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcService = void 0;
const common_1 = require("@nestjs/common");
const theta_ts_sdk_1 = require("theta-ts-sdk");
let RpcService = class RpcService {
    constructor() { }
    async getVersion() {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getVersion()).result;
    }
    async getAccount(address) {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getAccount(address)).result;
    }
    async getAccountByHash(hash) {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getBlock(hash)).result;
    }
    async getBlockByHeight(height) {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getBlockByHeight(height.toString())).result;
    }
    async getStatus() {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getStatus()).result;
    }
    async getTransactionByHash(hash) {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getTransaction(hash)).result;
    }
    async getVcpByHeight(height) {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getVcpByHeight(height.toString())).result;
    }
    async getGcpByHeight(height) {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getGcpByHeight(height.toString())).result;
    }
    async getEenpByHeight(height) {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getEenpByHeight(height.toString())).result;
    }
    async getPendingTransactions() {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getPendingTransactions()).result;
    }
    async getStakeRewardDistributionByHeight(height) {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getStakeRewardDistributionByHeight(height.toString()))
            .result;
    }
    async getBlockSByRange(height, endHeight) {
        return (await theta_ts_sdk_1.thetaTsSdk.blockchain.getBlockSByRange(height.toString(), endHeight.toString()))
            .result;
    }
    async callSmartContract(from, to, data) {
        return await theta_ts_sdk_1.thetaTsSdk.blockchain.callSmartContract(from, to, data);
    }
};
RpcService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RpcService);
exports.RpcService = RpcService;
//# sourceMappingURL=rpc.service.js.map