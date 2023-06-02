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
exports.NftTransferRecordEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const typeorm_1 = require("typeorm");
let NftTransferRecordEntity = class NftTransferRecordEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NftTransferRecordEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftTransferRecordEntity.prototype, "smart_contract_address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftTransferRecordEntity.prototype, "from", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], NftTransferRecordEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: '', nullable: true }),
    __metadata("design:type", String)
], NftTransferRecordEntity.prototype, "img_uri", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftTransferRecordEntity.prototype, "to", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftTransferRecordEntity.prototype, "token_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], NftTransferRecordEntity.prototype, "payment_token_amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], NftTransferRecordEntity.prototype, "tdrop_mined", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0
    }),
    __metadata("design:type", Number)
], NftTransferRecordEntity.prototype, "height", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], NftTransferRecordEntity.prototype, "transaction_hash", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftTransferRecordEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], NftTransferRecordEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], NftTransferRecordEntity.prototype, "update_date", void 0);
NftTransferRecordEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['smart_contract_address', 'token_id', 'timestamp']),
    (0, typeorm_1.Index)(['smart_contract_address']),
    (0, typeorm_1.Index)(['smart_contract_address', 'timestamp']),
    (0, typeorm_1.Index)(['from']),
    (0, typeorm_1.Index)(['to'])
], NftTransferRecordEntity);
exports.NftTransferRecordEntity = NftTransferRecordEntity;
//# sourceMappingURL=nft-transfer-record.entity.js.map