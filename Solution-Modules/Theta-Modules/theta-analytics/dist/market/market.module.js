"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketModule = void 0;
const rpc_module_1 = require("./../block-chain/rpc/rpc.module");
const exchange_module_1 = require("./../exchange/exchange.module");
const common_1 = require("@nestjs/common");
const market_resolver_1 = require("./market.resolver");
const market_service_1 = require("./market.service");
let MarketModule = class MarketModule {
};
MarketModule = __decorate([
    (0, common_1.Module)({
        imports: [common_1.CacheModule.register(), exchange_module_1.ExchangeModule, rpc_module_1.RpcModule],
        providers: [market_resolver_1.MarketResolver, market_service_1.MarketService],
        exports: [market_service_1.MarketService]
    })
], MarketModule);
exports.MarketModule = MarketModule;
//# sourceMappingURL=market.module.js.map