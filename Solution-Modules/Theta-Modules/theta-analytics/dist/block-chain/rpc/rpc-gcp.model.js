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
exports.GetGcpByHeightModel = exports.BlockHashGcpPairType = exports.GcpType = void 0;
const graphql_1 = require("@nestjs/graphql");
const rpc_vcp_model_1 = require("./rpc-vcp.model");
let GcpType = class GcpType {
};
__decorate([
    (0, graphql_1.Field)(() => [rpc_vcp_model_1.CandidateType]),
    __metadata("design:type", Array)
], GcpType.prototype, "SortedGuardians", void 0);
GcpType = __decorate([
    (0, graphql_1.ObjectType)()
], GcpType);
exports.GcpType = GcpType;
let BlockHashGcpPairType = class BlockHashGcpPairType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BlockHashGcpPairType.prototype, "BlockHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => GcpType),
    __metadata("design:type", GcpType)
], BlockHashGcpPairType.prototype, "Gcp", void 0);
__decorate([
    (0, graphql_1.Field)(() => rpc_vcp_model_1.HeightListType, { nullable: true }),
    __metadata("design:type", rpc_vcp_model_1.HeightListType)
], BlockHashGcpPairType.prototype, "HeightList", void 0);
BlockHashGcpPairType = __decorate([
    (0, graphql_1.ObjectType)()
], BlockHashGcpPairType);
exports.BlockHashGcpPairType = BlockHashGcpPairType;
let GetGcpByHeightModel = class GetGcpByHeightModel {
};
__decorate([
    (0, graphql_1.Field)(() => [BlockHashGcpPairType]),
    __metadata("design:type", Array)
], GetGcpByHeightModel.prototype, "BlockHashGcpPairs", void 0);
GetGcpByHeightModel = __decorate([
    (0, graphql_1.ObjectType)()
], GetGcpByHeightModel);
exports.GetGcpByHeightModel = GetGcpByHeightModel;
//# sourceMappingURL=rpc-gcp.model.js.map