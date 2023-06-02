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
exports.WalletSendHistoryEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const typeorm_1 = require("typeorm");
let WalletSendHistoryEntity = class WalletSendHistoryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WalletSendHistoryEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletSendHistoryEntity.prototype, "from", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletSendHistoryEntity.prototype, "to", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WalletSendHistoryEntity.prototype, "tx_hash", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({
        type: 'float'
    }),
    __metadata("design:type", Number)
], WalletSendHistoryEntity.prototype, "theta", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({
        type: 'float'
    }),
    __metadata("design:type", Number)
], WalletSendHistoryEntity.prototype, "tfuel", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({
        type: 'int'
    }),
    __metadata("design:type", Number)
], WalletSendHistoryEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], WalletSendHistoryEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], WalletSendHistoryEntity.prototype, "update_date", void 0);
WalletSendHistoryEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Index)(['from', 'timestamp']),
    (0, typeorm_1.Index)(['to', 'timestamp']),
    (0, typeorm_1.Unique)(['from', 'to', 'tx_hash'])
], WalletSendHistoryEntity);
exports.WalletSendHistoryEntity = WalletSendHistoryEntity;
//# sourceMappingURL=wallet-send-history.entity.js.map