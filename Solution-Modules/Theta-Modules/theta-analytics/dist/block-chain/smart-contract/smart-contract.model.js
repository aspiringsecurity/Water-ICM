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
exports.RankByEnum = exports.SmartContractVerifyType = exports.SmartContractScType = exports.UpdateRecordType = exports.SmartContractStatisticsType = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const smart_contract_entity_1 = require("./smart-contract.entity");
let SmartContractStatisticsType = class SmartContractStatisticsType {
};
__decorate([
    (0, graphql_1.Field)(() => [smart_contract_entity_1.SmartContractEntity]),
    __metadata("design:type", Array)
], SmartContractStatisticsType.prototype, "CallRank", void 0);
__decorate([
    (0, graphql_1.Field)(() => [smart_contract_entity_1.SmartContractEntity]),
    __metadata("design:type", Array)
], SmartContractStatisticsType.prototype, "Search", void 0);
SmartContractStatisticsType = __decorate([
    (0, graphql_1.ObjectType)({ description: 'Statistics on smart contract related calls' })
], SmartContractStatisticsType);
exports.SmartContractStatisticsType = SmartContractStatisticsType;
let UpdateRecordType = class UpdateRecordType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateRecordType.prototype, "affected_rows", void 0);
UpdateRecordType = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateRecordType);
exports.UpdateRecordType = UpdateRecordType;
let SmartContractScType = class SmartContractScType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SmartContractScType.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SmartContractScType.prototype, "abi", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SmartContractScType.prototype, "source_code", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SmartContractScType.prototype, "verification_date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SmartContractScType.prototype, "compiler_version", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SmartContractScType.prototype, "optimizer", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], SmartContractScType.prototype, "optimizerRuns", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SmartContractScType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SmartContractScType.prototype, "function_hash", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SmartContractScType.prototype, "constructor_arguments", void 0);
SmartContractScType = __decorate([
    (0, graphql_1.ObjectType)()
], SmartContractScType);
exports.SmartContractScType = SmartContractScType;
let SmartContractVerifyType = class SmartContractVerifyType {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLBoolean),
    __metadata("design:type", Boolean)
], SmartContractVerifyType.prototype, "is_verified", void 0);
__decorate([
    (0, graphql_1.Field)(() => SmartContractScType, { nullable: true }),
    __metadata("design:type", SmartContractScType)
], SmartContractVerifyType.prototype, "smart_contract", void 0);
SmartContractVerifyType = __decorate([
    (0, graphql_1.ObjectType)({ description: 'smart contract verification' })
], SmartContractVerifyType);
exports.SmartContractVerifyType = SmartContractVerifyType;
var RankByEnum;
(function (RankByEnum) {
    RankByEnum[RankByEnum["call_times"] = 0] = "call_times";
    RankByEnum[RankByEnum["last_24h_call_times"] = 1] = "last_24h_call_times";
    RankByEnum[RankByEnum["last_seven_days_call_times"] = 2] = "last_seven_days_call_times";
})(RankByEnum = exports.RankByEnum || (exports.RankByEnum = {}));
(0, graphql_1.registerEnumType)(RankByEnum, {
    name: 'RankByEnum'
});
//# sourceMappingURL=smart-contract.model.js.map