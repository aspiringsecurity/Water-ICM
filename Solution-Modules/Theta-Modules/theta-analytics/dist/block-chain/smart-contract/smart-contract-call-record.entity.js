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
exports.SmartContractCallRecordEntity = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let SmartContractCallRecordEntity = class SmartContractCallRecordEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], SmartContractCallRecordEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SmartContractCallRecordEntity.prototype, "contract_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SmartContractCallRecordEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SmartContractCallRecordEntity.prototype, "receipt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], SmartContractCallRecordEntity.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', unique: true }),
    __metadata("design:type", String)
], SmartContractCallRecordEntity.prototype, "transaction_hash", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { description: 'Calling time' }),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], SmartContractCallRecordEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], SmartContractCallRecordEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], SmartContractCallRecordEntity.prototype, "update_date", void 0);
SmartContractCallRecordEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['contract_id', 'timestamp']),
    (0, typeorm_1.Index)(['height']),
    (0, typeorm_1.Index)(['contract_id', 'height'])
], SmartContractCallRecordEntity);
exports.SmartContractCallRecordEntity = SmartContractCallRecordEntity;
//# sourceMappingURL=smart-contract-call-record.entity.js.map