"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyseWalletDpWdHistory = exports.analyseWalletSendHistory = exports.analyseNft = exports.serve = exports.analyse = void 0;
const analyse_1 = require("./analyse");
const serve_1 = require("./serve");
const analyse_nft_1 = require("./analyse/analyse-nft");
const analyse_wallet_dp_wd_history_1 = require("./analyse/analyse-wallet-dp-wd-history");
const analyse_wallet_send_history_1 = require("./analyse/analyse-wallet-send-history");
exports.analyse = analyse_1.analyseBootstrap;
exports.serve = serve_1.bootstrap;
exports.analyseNft = analyse_nft_1.analyseNftBootstrap;
exports.analyseWalletSendHistory = analyse_wallet_send_history_1.analyseWalletSendHistoryBootstrap;
exports.analyseWalletDpWdHistory = analyse_wallet_dp_wd_history_1.analyseWalletDpWdHistoryBootstrap;
//# sourceMappingURL=index.js.map