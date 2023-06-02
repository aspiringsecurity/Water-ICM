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
exports.ContactEntity = exports.SmartContractProtocolEnum = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
var SmartContractProtocolEnum;
(function (SmartContractProtocolEnum) {
    SmartContractProtocolEnum[SmartContractProtocolEnum["unknow"] = 1] = "unknow";
    SmartContractProtocolEnum[SmartContractProtocolEnum["tnt721"] = 2] = "tnt721";
    SmartContractProtocolEnum[SmartContractProtocolEnum["tnt20"] = 3] = "tnt20";
})(SmartContractProtocolEnum = exports.SmartContractProtocolEnum || (exports.SmartContractProtocolEnum = {}));
let ContactEntity = class ContactEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContactEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactEntity.prototype, "first_name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactEntity.prototype, "last_name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactEntity.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContactEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Number)
], ContactEntity.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Number)
], ContactEntity.prototype, "update_date", void 0);
ContactEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], ContactEntity);
exports.ContactEntity = ContactEntity;
//# sourceMappingURL=contact.entity.js.map