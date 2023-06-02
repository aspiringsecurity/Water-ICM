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
exports.MarketInformationType = exports.TokenMarketInformationType = exports.TOKEN_PAIR_TYPE = exports.KLINE_INTERVAL = exports.KlineObj = void 0;
const graphql_1 = require("@nestjs/graphql");
let KlineObj = class KlineObj {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], KlineObj.prototype, "time", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], KlineObj.prototype, "price", void 0);
KlineObj = __decorate([
    (0, graphql_1.ObjectType)()
], KlineObj);
exports.KlineObj = KlineObj;
var KLINE_INTERVAL;
(function (KLINE_INTERVAL) {
    KLINE_INTERVAL["_1m"] = "1m";
    KLINE_INTERVAL["_3m"] = "3m";
    KLINE_INTERVAL["_5m"] = "5m";
    KLINE_INTERVAL["_15m"] = "15m";
    KLINE_INTERVAL["_30m"] = "30m";
    KLINE_INTERVAL["_1h"] = "1h";
    KLINE_INTERVAL["_2h"] = "2h";
    KLINE_INTERVAL["_4h"] = "4h";
    KLINE_INTERVAL["_6h"] = "6h";
    KLINE_INTERVAL["_8h"] = "8h";
    KLINE_INTERVAL["_12h"] = "12h";
    KLINE_INTERVAL["_1d"] = "1d";
    KLINE_INTERVAL["_3d"] = "3d";
    KLINE_INTERVAL["_1w"] = "1w";
    KLINE_INTERVAL["_1M"] = "1M";
})(KLINE_INTERVAL = exports.KLINE_INTERVAL || (exports.KLINE_INTERVAL = {}));
(0, graphql_1.registerEnumType)(KLINE_INTERVAL, {
    name: 'KLINE_INTERVAL'
});
var TOKEN_PAIR_TYPE;
(function (TOKEN_PAIR_TYPE) {
    TOKEN_PAIR_TYPE["thetaUsdt"] = "THETAUSDT";
    TOKEN_PAIR_TYPE["tfuelUSdt"] = "TFUELUSDT";
})(TOKEN_PAIR_TYPE = exports.TOKEN_PAIR_TYPE || (exports.TOKEN_PAIR_TYPE = {}));
(0, graphql_1.registerEnumType)(TOKEN_PAIR_TYPE, {
    name: 'TOKEN_PAIR_TYPE'
});
let TokenMarketInformationType = class TokenMarketInformationType {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TokenMarketInformationType.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], TokenMarketInformationType.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], TokenMarketInformationType.prototype, "circulating_supply", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], TokenMarketInformationType.prototype, "total_supply", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], TokenMarketInformationType.prototype, "volume_24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], TokenMarketInformationType.prototype, "price_change_percent", void 0);
__decorate([
    (0, graphql_1.Field)(() => [KlineObj]),
    __metadata("design:type", Array)
], TokenMarketInformationType.prototype, "kline", void 0);
TokenMarketInformationType = __decorate([
    (0, graphql_1.ObjectType)()
], TokenMarketInformationType);
exports.TokenMarketInformationType = TokenMarketInformationType;
let MarketInformationType = class MarketInformationType {
};
__decorate([
    (0, graphql_1.Field)(() => TokenMarketInformationType),
    __metadata("design:type", TokenMarketInformationType)
], MarketInformationType.prototype, "Theta", void 0);
__decorate([
    (0, graphql_1.Field)(() => TokenMarketInformationType),
    __metadata("design:type", TokenMarketInformationType)
], MarketInformationType.prototype, "ThetaFuel", void 0);
MarketInformationType = __decorate([
    (0, graphql_1.ObjectType)()
], MarketInformationType);
exports.MarketInformationType = MarketInformationType;
//# sourceMappingURL=market.model.js.map