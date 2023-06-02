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
exports.SmartContractResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const smart_contract_service_1 = require("./smart-contract.service");
const smart_contract_model_1 = require("./smart-contract.model");
const graphql_2 = require("graphql");
const nft_service_1 = require("./nft/nft.service");
const utils_service_1 = require("../../common/utils.service");
const smart_contract_entity_1 = require("./smart-contract.entity");
const common_1 = require("@nestjs/common");
let SmartContractResolver = class SmartContractResolver {
    constructor(smartContractService, nftService, utilsService) {
        this.smartContractService = smartContractService;
        this.nftService = nftService;
        this.utilsService = utilsService;
        this.logger = new common_1.Logger();
    }
    async SmartContractStatistics() {
        return {};
    }
    async CallRank(smartContract, rank_by, take) {
        return await this.smartContractService.getSmartContract(rank_by, take);
    }
    async Search(protocol, name, rank_by, take) {
        return await this.smartContractService.searchSmartContract(protocol, name, rank_by, take);
    }
    async verify(address, sourceCode, byteCode, version, versionFullName, optimizer, optimizerRuns) {
        return await this.smartContractService.verifySmartContract(address, sourceCode, byteCode, version, versionFullName, optimizer, optimizerRuns);
    }
    async verifyWithThetaExplorer(address) {
        const res = await this.utilsService.getJsonRes('https://explorer.thetatoken.org:8443/api/smartcontract/' + address);
        const optimizer = res.body.optimizer === 'disabled' ? false : true;
        const optimizerRuns = res.body.optimizerRuns ? res.body.optimizerRuns : 200;
        address = this.utilsService.normalize(address.toLowerCase());
        this.logger.debug('start verify');
        return await this.smartContractService.directVerifySmartContract(address, res.body.source_code, res.body.bytecode, res.body.optimizer, optimizerRuns, Math.floor(Number(res.body.verification_date) / 1000), res.body.compiler_version, res.body.name, JSON.stringify(res.body.function_hash), res.body.constructor_arguments, JSON.stringify(res.body.abi));
    }
    async updateRecord(address) {
        const affectedRows = await this.nftService.parseRecordByContractAddress(address);
        return { affected_rows: affectedRows };
    }
};
__decorate([
    (0, graphql_1.Query)(() => smart_contract_model_1.SmartContractStatisticsType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartContractResolver.prototype, "SmartContractStatistics", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __param(1, (0, graphql_1.Args)('rank_by', { type: () => smart_contract_model_1.RankByEnum, nullable: true })),
    __param(2, (0, graphql_1.Args)('take', { type: () => graphql_2.GraphQLInt, nullable: false, defaultValue: 500 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [smart_contract_model_1.SmartContractStatisticsType, Number, Number]),
    __metadata("design:returntype", Promise)
], SmartContractResolver.prototype, "CallRank", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('protocol', { type: () => smart_contract_entity_1.SmartContractProtocolEnum, nullable: true })),
    __param(1, (0, graphql_1.Args)('name', { type: () => graphql_2.GraphQLString, nullable: true })),
    __param(2, (0, graphql_1.Args)('rank_by', { type: () => smart_contract_model_1.RankByEnum, nullable: true })),
    __param(3, (0, graphql_1.Args)('take', { type: () => graphql_2.GraphQLInt, nullable: false, defaultValue: 500 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number, Number]),
    __metadata("design:returntype", Promise)
], SmartContractResolver.prototype, "Search", null);
__decorate([
    __param(0, (0, graphql_1.Args)({
        name: 'address'
    })),
    __param(1, (0, graphql_1.Args)({
        name: 'sourceCode'
    })),
    __param(2, (0, graphql_1.Args)({
        name: 'byteCode'
    })),
    __param(3, (0, graphql_1.Args)({
        name: 'version'
    })),
    __param(4, (0, graphql_1.Args)({
        name: 'versionFullName'
    })),
    __param(5, (0, graphql_1.Args)({
        name: 'optimizer'
    })),
    __param(6, (0, graphql_1.Args)({
        name: 'optimizerRuns',
        type: () => graphql_1.Int
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Boolean, Number]),
    __metadata("design:returntype", Promise)
], SmartContractResolver.prototype, "verify", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => smart_contract_entity_1.SmartContractEntity),
    __param(0, (0, graphql_1.Args)({
        name: 'address'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SmartContractResolver.prototype, "verifyWithThetaExplorer", null);
__decorate([
    __param(0, (0, graphql_1.Args)({
        name: 'address'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SmartContractResolver.prototype, "updateRecord", null);
SmartContractResolver = __decorate([
    (0, graphql_1.Resolver)(() => smart_contract_model_1.SmartContractStatisticsType),
    __metadata("design:paramtypes", [smart_contract_service_1.SmartContractService,
        nft_service_1.NftService,
        utils_service_1.UtilsService])
], SmartContractResolver);
exports.SmartContractResolver = SmartContractResolver;
//# sourceMappingURL=smart-contract.resolver.js.map