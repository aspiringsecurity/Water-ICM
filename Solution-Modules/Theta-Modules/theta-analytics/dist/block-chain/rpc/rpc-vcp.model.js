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
exports.GetVcpByHeightModel = exports.BlockHashVcpPair = exports.HeightListType = exports.VcpPairType = exports.CandidateType = exports.CandidateStakeType = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let CandidateStakeType = class CandidateStakeType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CandidateStakeType.prototype, "source", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CandidateStakeType.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLBoolean),
    __metadata("design:type", Boolean)
], CandidateStakeType.prototype, "withdrawn", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CandidateStakeType.prototype, "return_height", void 0);
CandidateStakeType = __decorate([
    (0, graphql_1.ObjectType)()
], CandidateStakeType);
exports.CandidateStakeType = CandidateStakeType;
let CandidateType = class CandidateType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CandidateType.prototype, "Holder", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CandidateStakeType]),
    __metadata("design:type", Array)
], CandidateType.prototype, "Stakes", void 0);
CandidateType = __decorate([
    (0, graphql_1.ObjectType)()
], CandidateType);
exports.CandidateType = CandidateType;
let VcpPairType = class VcpPairType {
};
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], VcpPairType.prototype, "BlockHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CandidateType]),
    __metadata("design:type", Array)
], VcpPairType.prototype, "SortedCandidates", void 0);
VcpPairType = __decorate([
    (0, graphql_1.ObjectType)()
], VcpPairType);
exports.VcpPairType = VcpPairType;
let HeightListType = class HeightListType {
};
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    __metadata("design:type", Array)
], HeightListType.prototype, "Heights", void 0);
HeightListType = __decorate([
    (0, graphql_1.ObjectType)()
], HeightListType);
exports.HeightListType = HeightListType;
let BlockHashVcpPair = class BlockHashVcpPair {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BlockHashVcpPair.prototype, "BlockHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => VcpPairType),
    __metadata("design:type", VcpPairType)
], BlockHashVcpPair.prototype, "Vcp", void 0);
__decorate([
    (0, graphql_1.Field)(() => HeightListType),
    __metadata("design:type", HeightListType)
], BlockHashVcpPair.prototype, "HeightList", void 0);
BlockHashVcpPair = __decorate([
    (0, graphql_1.ObjectType)()
], BlockHashVcpPair);
exports.BlockHashVcpPair = BlockHashVcpPair;
let GetVcpByHeightModel = class GetVcpByHeightModel {
};
__decorate([
    (0, graphql_1.Field)(() => [BlockHashVcpPair]),
    __metadata("design:type", Array)
], GetVcpByHeightModel.prototype, "BlockHashVcpPairs", void 0);
GetVcpByHeightModel = __decorate([
    (0, graphql_1.ObjectType)()
], GetVcpByHeightModel);
exports.GetVcpByHeightModel = GetVcpByHeightModel;
//# sourceMappingURL=rpc-vcp.model.js.map