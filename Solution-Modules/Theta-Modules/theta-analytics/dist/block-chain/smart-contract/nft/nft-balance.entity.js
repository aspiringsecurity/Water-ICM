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
exports.NftBalanceEntity = exports.NftStatusEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
var NftStatusEnum;
(function (NftStatusEnum) {
    NftStatusEnum[NftStatusEnum["invalid"] = 1] = "invalid";
    NftStatusEnum[NftStatusEnum["valid"] = 2] = "valid";
})(NftStatusEnum = exports.NftStatusEnum || (exports.NftStatusEnum = {}));
let NftBalanceEntity = class NftBalanceEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], NftBalanceEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftBalanceEntity.prototype, "smart_contract_address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftBalanceEntity.prototype, "owner", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftBalanceEntity.prototype, "from", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], NftBalanceEntity.prototype, "contract_uri", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], NftBalanceEntity.prototype, "base_token_uri", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], NftBalanceEntity.prototype, "token_uri", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], NftBalanceEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ default: '', nullable: true }),
    __metadata("design:type", String)
], NftBalanceEntity.prototype, "img_uri", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], NftBalanceEntity.prototype, "detail", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftBalanceEntity.prototype, "token_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], NftBalanceEntity.prototype, "refetch_times", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], NftBalanceEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], NftBalanceEntity.prototype, "update_date", void 0);
NftBalanceEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['smart_contract_address']),
    (0, typeorm_1.Index)(['owner']),
    (0, typeorm_1.Index)(['smart_contract_address', 'owner']),
    (0, typeorm_1.Unique)(['smart_contract_address', 'token_id'])
], NftBalanceEntity);
exports.NftBalanceEntity = NftBalanceEntity;
//# sourceMappingURL=nft-balance.entity.js.map