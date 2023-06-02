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
exports.GetEenpByHeightModel = exports.BlockHashEenpPairType = void 0;
const graphql_1 = require("@nestjs/graphql");
const rpc_vcp_model_1 = require("./rpc-vcp.model");
let BlockHashEenpPairType = class BlockHashEenpPairType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BlockHashEenpPairType.prototype, "BlockHash", void 0);
__decorate([
    (0, graphql_1.Field)(() => [rpc_vcp_model_1.CandidateType]),
    __metadata("design:type", Array)
], BlockHashEenpPairType.prototype, "EENs", void 0);
__decorate([
    (0, graphql_1.Field)(() => rpc_vcp_model_1.HeightListType, { nullable: true }),
    __metadata("design:type", rpc_vcp_model_1.HeightListType)
], BlockHashEenpPairType.prototype, "HeightList", void 0);
BlockHashEenpPairType = __decorate([
    (0, graphql_1.ObjectType)()
], BlockHashEenpPairType);
exports.BlockHashEenpPairType = BlockHashEenpPairType;
let GetEenpByHeightModel = class GetEenpByHeightModel {
};
__decorate([
    (0, graphql_1.Field)(() => [BlockHashEenpPairType]),
    __metadata("design:type", Array)
], GetEenpByHeightModel.prototype, "BlockHashEenpPairs", void 0);
GetEenpByHeightModel = __decorate([
    (0, graphql_1.ObjectType)()
], GetEenpByHeightModel);
exports.GetEenpByHeightModel = GetEenpByHeightModel;
//# sourceMappingURL=rpc-eenp.model.js.map