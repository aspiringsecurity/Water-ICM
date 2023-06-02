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
exports.SmartContractEntity = exports.SmartContractProtocolEnum = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
var SmartContractProtocolEnum;
(function (SmartContractProtocolEnum) {
    SmartContractProtocolEnum[SmartContractProtocolEnum["unknow"] = 1] = "unknow";
    SmartContractProtocolEnum[SmartContractProtocolEnum["tnt721"] = 2] = "tnt721";
    SmartContractProtocolEnum[SmartContractProtocolEnum["tnt20"] = 3] = "tnt20";
})(SmartContractProtocolEnum = exports.SmartContractProtocolEnum || (exports.SmartContractProtocolEnum = {}));
(0, graphql_1.registerEnumType)(SmartContractProtocolEnum, {
    name: 'SmartContractProtocolEnum'
});
let SmartContractEntity = class SmartContractEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ description: 'Address of the smart contract' }),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "contract_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "height", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLBoolean),
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], SmartContractEntity.prototype, "verified", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'int', default: SmartContractProtocolEnum.unknow }),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "protocol", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "abi", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "source_code", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "byte_code", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "verification_date", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "compiler_version", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "optimizer", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "optimizerRuns", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "function_hash", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "constructor_arguments", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Total number of smart contract calls' }),
    (0, typeorm_1.Index)('call_times'),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 1
    }),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "call_times", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Number of smart contract calls in the last 7 days' }),
    (0, typeorm_1.Index)('last_seven_days_call_times'),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 1
    }),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "last_seven_days_call_times", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Number of smart contract calls in the last 24 hours' }),
    (0, typeorm_1.Index)('last_24h_call_times'),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 1
    }),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "last_24h_call_times", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'call times update timestamp' }),
    (0, typeorm_1.Index)('call_times_update_date'),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "call_times_update_timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'verification check timestamp' }),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "verification_check_timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "contract_uri", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], SmartContractEntity.prototype, "contract_uri_detail", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ default: 14687288, type: 'int' }),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "latest_record_parse_height", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], SmartContractEntity.prototype, "update_date", void 0);
SmartContractEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['name', 'protocol']),
    (0, typeorm_1.Index)(['call_times']),
    (0, typeorm_1.Index)(['last_seven_days_call_times']),
    (0, typeorm_1.Index)(['last_24h_call_times'])
], SmartContractEntity);
exports.SmartContractEntity = SmartContractEntity;
//# sourceMappingURL=smart-contract.entity.js.map