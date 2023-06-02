export declare class RpcService {
    constructor();
    getVersion(): Promise<{
        version: string;
        git_hash: string;
        timestamp: string;
    }>;
    getAccount(address: string): Promise<{
        sequence: number;
        coins: {
            thetawei: string;
            tfuelwei: string;
        };
        reserved_funds: number[];
        last_updated_block_height: string;
        root: string;
        code: string;
    }>;
    getAccountByHash(hash: string): Promise<import("theta-ts-sdk/dist/types/interface").THETA_BLOCK_INTERFACE>;
    getBlockByHeight(height: number): Promise<import("theta-ts-sdk/dist/types/interface").THETA_BLOCK_INTERFACE>;
    getStatus(): Promise<{
        address: string;
        chain_id: string;
        peer_id: string;
        latest_finalized_block_hash: string;
        latest_finalized_block_height: string;
        latest_finalized_block_time: string;
        latest_finalized_block_epoch: string;
        current_epoch: string;
        current_height: string;
        current_time: string;
        syncing: false;
        genesis_block_hash: "0xd8836c6cf3c3ccea0b015b4ed0f9efb0ffe6254db793a515843c9d0f68cbab65";
    }>;
    getTransactionByHash(hash: string): Promise<{
        block_hash: string;
        block_height: string;
        status: string;
        hash: string;
        transaction: {
            proposer?: import("theta-ts-sdk/dist/types/interface").THETA_TRANSACTION_PROPOSER_TYPE;
            fee: {
                thetawei: string;
                tfuelwei: string;
            };
            inputs: {
                address: string;
                coins: {
                    thetawei: string;
                    tfuelwei: string;
                };
                sequence: string;
                signature: string;
            }[];
            outputs: {
                address: string;
                coins: {
                    thetawei: string;
                    tfuelwei: string;
                };
            }[];
            gas_limit?: string;
            gas_price?: string;
            from?: import("theta-ts-sdk/dist/types/interface").THETA_TRANSACTION_PROPOSER_TYPE;
            to?: import("theta-ts-sdk/dist/types/interface").THETA_TRANSACTION_PROPOSER_TYPE;
            data?: string;
            block_height?: string;
            payment_sequence?: string;
            reserve_sequence?: string;
            resource_id?: string;
            target?: import("theta-ts-sdk/dist/types/interface").THETA_TRANSACTION_SOURCE_TARGET_TYPE;
            source?: import("theta-ts-sdk/dist/types/interface").THETA_TRANSACTION_SOURCE_TARGET_TYPE;
            collateral?: import("theta-ts-sdk/dist/types/interface").THETA_TOKEN_TYPE;
            resource_ids?: string[];
            duration?: string;
        };
        type: import("theta-ts-sdk/dist/types/enum").THETA_TRANSACTION_TYPE_ENUM;
        receipt?: import("theta-ts-sdk/dist/types/interface").THETA_TRANSACTION_RECEIPT_TYPE;
    }>;
    getVcpByHeight(height: number): Promise<{
        BlockHashVcpPairs: [{
            BlockHash: string;
            Vcp: {
                SortedCandidates: {
                    Holder: string;
                    Stakes: {
                        source: string;
                        amount: string;
                        withdrawn: boolean;
                        return_height: string;
                    }[];
                }[];
            };
            HeightList: {
                Heights: number[];
            };
        }];
    }>;
    getGcpByHeight(height: number): Promise<{
        BlockHashGcpPairs: [{
            BlockHash: string;
            Gcp: {
                SortedGuardians: {
                    Holder: string;
                    Stakes: {
                        source: string;
                        amount: string;
                        withdrawn: boolean;
                        return_height: string;
                    }[];
                }[];
            };
            HeightList: {
                Heights: number[];
            };
        }];
    }>;
    getEenpByHeight(height: number): Promise<{
        BlockHashEenpPairs: [{
            BlockHash: string;
            EENs: {
                Holder: string;
                Stakes: {
                    source: string;
                    amount: string;
                    withdrawn: boolean;
                    return_height: string;
                }[];
            }[];
            HeightList: {
                Heights: number[];
            };
        }];
    }>;
    getPendingTransactions(): Promise<{
        tx_hashes: string[];
    }>;
    getStakeRewardDistributionByHeight(height: number): Promise<{
        BlockHashStakeRewardDistributionRuleSetPairs: {
            BlockHash: string;
            StakeRewardDistributionRuleSet: {
                Beneficiary: string;
                SplitBasisPoint: string;
                StakeHolder: string;
            }[];
        }[];
    }>;
    getBlockSByRange(height: number, endHeight: number): Promise<import("theta-ts-sdk/dist/types/interface").THETA_BLOCK_INTERFACE[]>;
    callSmartContract(from: string, to: string, data: string): Promise<import("theta-ts-sdk/dist/types/interface").THETA_CALL_SMART_CONTRACT_INTERFACE>;
}
