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
exports.TransactionEntity = void 0;
const theta_enum_1 = require("./../tx/theta.enum");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const typeorm_1 = require("typeorm");
let TransactionEntity = class TransactionEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "tx_hash", void 0);
__decorate([
    (0, graphql_1.Field)(() => theta_enum_1.THETA_TRANSACTION_TYPE_ENUM),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "tx_type", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "from", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "to", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "fee", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "gas_price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "gas_limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "height", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "theta", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "theta_fuel", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], TransactionEntity.prototype, "update_date", void 0);
TransactionEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['height'])
], TransactionEntity);
exports.TransactionEntity = TransactionEntity;
//# sourceMappingURL=transaction.entity.js.map