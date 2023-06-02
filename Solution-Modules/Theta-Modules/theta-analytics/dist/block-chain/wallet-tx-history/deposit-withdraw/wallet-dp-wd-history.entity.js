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
exports.WalletDpWdHistoryEntity = void 0;
const graphql_1 = require("graphql");
const stake_model_1 = require("../../stake/stake.model");
const typeorm_1 = require("typeorm");
const graphql_2 = require("@nestjs/graphql");
const graphql_3 = require("graphql");
const theta_enum_1 = require("../../tx/theta.enum");
let WalletDpWdHistoryEntity = class WalletDpWdHistoryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WalletDpWdHistoryEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletDpWdHistoryEntity.prototype, "wallet_address", void 0);
__decorate([
    (0, graphql_2.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletDpWdHistoryEntity.prototype, "tx_hash", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_3.GraphQLFloat),
    (0, typeorm_1.Column)({
        type: 'float'
    }),
    __metadata("design:type", Number)
], WalletDpWdHistoryEntity.prototype, "theta", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_3.GraphQLFloat),
    (0, typeorm_1.Column)({
        type: 'float'
    }),
    __metadata("design:type", Number)
], WalletDpWdHistoryEntity.prototype, "tfuel", void 0);
__decorate([
    (0, graphql_2.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletDpWdHistoryEntity.prototype, "node_address", void 0);
__decorate([
    (0, graphql_2.Field)(() => stake_model_1.STAKE_NODE_TYPE_ENUM),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], WalletDpWdHistoryEntity.prototype, "node_type", void 0);
__decorate([
    (0, graphql_2.Field)(() => theta_enum_1.THETA_TRANSACTION_TYPE_ENUM),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], WalletDpWdHistoryEntity.prototype, "tx_type", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.GraphQLInt),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], WalletDpWdHistoryEntity.prototype, "height", void 0);
__decorate([
    (0, graphql_2.Field)(() => graphql_1.GraphQLInt),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], WalletDpWdHistoryEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], WalletDpWdHistoryEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], WalletDpWdHistoryEntity.prototype, "update_date", void 0);
WalletDpWdHistoryEntity = __decorate([
    (0, graphql_2.ObjectType)(),
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['wallet_address', 'timestamp']),
    (0, typeorm_1.Unique)(['wallet_address', 'node_address', 'height'])
], WalletDpWdHistoryEntity);
exports.WalletDpWdHistoryEntity = WalletDpWdHistoryEntity;
//# sourceMappingURL=wallet-dp-wd-history.entity.js.map