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
exports.PaginatedNftTransferRecord = exports.PaginatedSmartContract = exports.PaginatedNftBalance = exports.NftMetaType = exports.NftType = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_model_1 = require("../../../common/common.model");
const smart_contract_entity_1 = require("../smart-contract.entity");
const nft_balance_entity_1 = require("./nft-balance.entity");
const nft_transfer_record_entity_1 = require("./nft-transfer-record.entity");
let NftType = class NftType {
};
NftType = __decorate([
    (0, graphql_1.ObjectType)()
], NftType);
exports.NftType = NftType;
let NftMetaType = class NftMetaType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], NftMetaType.prototype, "unique_holder", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], NftMetaType.prototype, "total", void 0);
NftMetaType = __decorate([
    (0, graphql_1.ObjectType)()
], NftMetaType);
exports.NftMetaType = NftMetaType;
let PaginatedNftBalance = class PaginatedNftBalance extends (0, common_model_1.Paginated)(nft_balance_entity_1.NftBalanceEntity) {
};
PaginatedNftBalance = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedNftBalance);
exports.PaginatedNftBalance = PaginatedNftBalance;
let PaginatedSmartContract = class PaginatedSmartContract extends (0, common_model_1.Paginated)(smart_contract_entity_1.SmartContractEntity) {
};
PaginatedSmartContract = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedSmartContract);
exports.PaginatedSmartContract = PaginatedSmartContract;
let PaginatedNftTransferRecord = class PaginatedNftTransferRecord extends (0, common_model_1.Paginated)(nft_transfer_record_entity_1.NftTransferRecordEntity) {
};
PaginatedNftTransferRecord = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedNftTransferRecord);
exports.PaginatedNftTransferRecord = PaginatedNftTransferRecord;
//# sourceMappingURL=nft.model.js.map