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
exports.NftTradeStatisticsEntity = void 0;
const typeorm_1 = require("typeorm");
let NftTradeStatisticsEntity = class NftTradeStatisticsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], NftTradeStatisticsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftTradeStatisticsEntity.prototype, "smart_contract_address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftTradeStatisticsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NftTradeStatisticsEntity.prototype, "img_uri", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], NftTradeStatisticsEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], NftTradeStatisticsEntity.prototype, "volume", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        comment: '对应精确到小时的数据'
    }),
    __metadata("design:type", Number)
], NftTradeStatisticsEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], NftTradeStatisticsEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], NftTradeStatisticsEntity.prototype, "update_date", void 0);
NftTradeStatisticsEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['smart_contract_address', 'timestamp'])
], NftTradeStatisticsEntity);
exports.NftTradeStatisticsEntity = NftTradeStatisticsEntity;
//# sourceMappingURL=nft-trade-statistics.entity.js.map