"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const rpc_module_1 = require("./../block-chain/rpc/rpc.module");
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./logger.service");
const solc_service_1 = require("./solc.service");
const utils_service_1 = require("./utils.service");
let CommonModule = class CommonModule {
};
CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [rpc_module_1.RpcModule],
        providers: [solc_service_1.SolcService, utils_service_1.UtilsService, logger_service_1.LoggerService],
        exports: [solc_service_1.SolcService, utils_service_1.UtilsService, logger_service_1.LoggerService]
    })
], CommonModule);
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map