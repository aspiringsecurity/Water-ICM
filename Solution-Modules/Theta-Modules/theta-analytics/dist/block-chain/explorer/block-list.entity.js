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
exports.BlokcListEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const typeorm_1 = require("typeorm");
let BlokcListEntity = class BlokcListEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BlokcListEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int', unique: true }),
    __metadata("design:type", Number)
], BlokcListEntity.prototype, "height", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], BlokcListEntity.prototype, "block_hash", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], BlokcListEntity.prototype, "timestamp", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLFloat),
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], BlokcListEntity.prototype, "tfuel_burnt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLInt),
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], BlokcListEntity.prototype, "txns", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], BlokcListEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], BlokcListEntity.prototype, "update_date", void 0);
BlokcListEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], BlokcListEntity);
exports.BlokcListEntity = BlokcListEntity;
//# sourceMappingURL=block-list.entity.js.map