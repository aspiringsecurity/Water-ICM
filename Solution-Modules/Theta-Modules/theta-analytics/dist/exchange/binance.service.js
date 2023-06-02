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
exports.BinanceService = void 0;
const common_1 = require("@nestjs/common");
const axios = require('axios');
const default_options = {
    recvWindow: 50000,
    useServerTime: false,
    reconnect: true,
    verbose: false,
    test: false,
    info: { timeOffset: 0 }
};
let BinanceService = class BinanceService {
    constructor() {
        this.APISECRET = '';
        this.APIKEY = '';
        this.base = 'https://api.binance.com/api/';
        this.baseArr = [
            'https://api.binance.com/api/',
            'https://api1.binance.com/api/',
            'https://api2.binance.com/api/',
            'https://api3.binance.com/api/'
        ];
        this.logger = new common_1.Logger('BinanceService');
    }
    async prices(pair) {
        const params = typeof pair === 'string' ? '?symbol=' + pair.toUpperCase() : '';
        let opt = {
            url: this.baseArr[Math.floor(Math.random() * this.baseArr.length)] + 'v3/ticker/price',
            params: {
                symbol: pair.toUpperCase()
            },
            timeout: default_options.recvWindow,
            method: 'get'
        };
        let res = await axios(opt);
        return { price: Number(res.data.price) };
    }
    async kLine(pair, interval = '5m') {
        const params = typeof pair === 'string' ? '?symbol=' + pair.toUpperCase() : '';
        let opt = {
            url: this.baseArr[Math.floor(Math.random() * this.baseArr.length)] + 'v3/klines',
            params: {
                symbol: pair.toUpperCase(),
                interval: interval,
                limit: 1000
            },
            timeout: default_options.recvWindow,
            method: 'get',
            responseType: 'json'
        };
        const httpRes = await axios(opt);
        const dataToReturn = [];
        httpRes.data.forEach((item) => {
            dataToReturn.push({
                time: Number(item[0]),
                price: Number(item[2])
            });
        });
        return dataToReturn;
    }
    async tickerPriceChange(pair) {
        const params = typeof pair === 'string' ? '?symbol=' + pair.toUpperCase() : '';
        let opt = {
            url: this.baseArr[Math.floor(Math.random() * this.baseArr.length)] + 'v3/ticker/24hr',
            params: {
                symbol: pair.toUpperCase()
            },
            timeout: default_options.recvWindow,
            method: 'get'
        };
        let res = await axios(opt);
        const resToReturn = {
            symbol: '',
            priceChange: '',
            priceChangePercent: '',
            weightedAvgPrice: '',
            prevClosePrice: '',
            lastPrice: '',
            lastQty: '',
            bidPrice: '',
            bidQty: '',
            askPrice: '',
            askQty: '',
            openPrice: '',
            highPrice: '',
            lowPrice: '',
            volume: '',
            quoteVolume: '',
            openTime: '',
            closeTime: '',
            firstId: '',
            lastId: '',
            count: ''
        };
        return Object.assign(resToReturn, res.data);
    }
};
BinanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BinanceService);
exports.BinanceService = BinanceService;
//# sourceMappingURL=binance.service.js.map