"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.THETA_BLOCK_STATUS_ENUM = exports.THETA_TRANSACTION_TYPE_ENUM = void 0;
const graphql_1 = require("@nestjs/graphql");
var THETA_TRANSACTION_TYPE_ENUM;
(function (THETA_TRANSACTION_TYPE_ENUM) {
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["coinbase"] = 0] = "coinbase";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["slash"] = 1] = "slash";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["send"] = 2] = "send";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["reserve_fund"] = 3] = "reserve_fund";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["release_fund"] = 4] = "release_fund";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["service_payment"] = 5] = "service_payment";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["split_rule"] = 6] = "split_rule";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["smart_contract"] = 7] = "smart_contract";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["deposit_stake"] = 8] = "deposit_stake";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["withdraw_stake"] = 9] = "withdraw_stake";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["tx_deposit_stake_v2"] = 10] = "tx_deposit_stake_v2";
    THETA_TRANSACTION_TYPE_ENUM[THETA_TRANSACTION_TYPE_ENUM["tx_stake_reward_distribution"] = 11] = "tx_stake_reward_distribution";
})(THETA_TRANSACTION_TYPE_ENUM = exports.THETA_TRANSACTION_TYPE_ENUM || (exports.THETA_TRANSACTION_TYPE_ENUM = {}));
(0, graphql_1.registerEnumType)(THETA_TRANSACTION_TYPE_ENUM, { name: 'THETA_TRANSACTION_TYPE_ENUM' });
var THETA_BLOCK_STATUS_ENUM;
(function (THETA_BLOCK_STATUS_ENUM) {
    THETA_BLOCK_STATUS_ENUM[THETA_BLOCK_STATUS_ENUM["pending"] = 0] = "pending";
    THETA_BLOCK_STATUS_ENUM[THETA_BLOCK_STATUS_ENUM["valid"] = 1] = "valid";
    THETA_BLOCK_STATUS_ENUM[THETA_BLOCK_STATUS_ENUM["invalid"] = 2] = "invalid";
    THETA_BLOCK_STATUS_ENUM[THETA_BLOCK_STATUS_ENUM["committed"] = 3] = "committed";
    THETA_BLOCK_STATUS_ENUM[THETA_BLOCK_STATUS_ENUM["directly_finalized"] = 4] = "directly_finalized";
    THETA_BLOCK_STATUS_ENUM[THETA_BLOCK_STATUS_ENUM["indirectly_finalized"] = 5] = "indirectly_finalized";
    THETA_BLOCK_STATUS_ENUM[THETA_BLOCK_STATUS_ENUM["trusted"] = 6] = "trusted";
})(THETA_BLOCK_STATUS_ENUM = exports.THETA_BLOCK_STATUS_ENUM || (exports.THETA_BLOCK_STATUS_ENUM = {}));
(0, graphql_1.registerEnumType)(THETA_BLOCK_STATUS_ENUM, { name: 'THETA_BLOCK_STATUS_ENUM' });
//# sourceMappingURL=theta.enum.js.map