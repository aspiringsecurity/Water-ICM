import { RpcService } from './../block-chain/rpc/rpc.service';
import { Logger } from '@nestjs/common';
import { ethers } from 'ethers';
export interface LOG_DECODE_INTERFACE {
    address: string;
    data: string;
    topics: Array<string>;
    decode: {
        result: {
            '0': string;
            '1': string;
            '2': string;
            from: string;
            to: string;
            tokenId?: string;
            nftTokenID?: string;
            nftTokenAddress?: string;
            paymentTokenAmount?: string;
            price?: string;
            tdropMined?: string;
            seller?: string;
            buyer?: string;
            isSold?: string;
            nftContract?: string;
            owner?: string;
        };
        eventName: 'Transfer' | 'Approval' | 'ApprovalForAll' | 'NFTTraded' | 'MarketItemSale';
        event: {
            anonymous: boolean;
            inputs: [
                {
                    indexed: boolean;
                    name: string;
                    type: string;
                }
            ];
            name: string;
            type: string;
        };
    };
}
export declare class UtilsService {
    private rpcService;
    logger: Logger;
    constructor(rpcService: RpcService);
    decodeLogs(logs: any, abi: any): Array<LOG_DECODE_INTERFACE>;
    checkTnt721(abi: any): boolean;
    checkTnt20(abi: any): boolean;
    check(obj: any, abi: any): boolean;
    readSmartContract(from: string, to: string, abi: any, functionName: string, inputTypes: Array<any>, inputValues: Array<any>, outputTypes: Array<any>): Promise<ethers.utils.Result>;
    normalize: (hash: any) => any;
    getHex(str: any): string;
    getBytecodeWithoutMetadata(bytecode: any): any;
    stampDate(sourceCode: any): string;
    getRecordHeight(path: string): number;
    getHeightRangeToAnalyse(module: string, heightConfigFile: any): Promise<[number, number]>;
    updateRecordHeight(path: string, height: number): void;
    getRandomStr(length: number): string;
    downloadImage(urlPath: string, storePath: string): Promise<string | null>;
    getJsonRes(urlPath: string, timeout?: number): Promise<any>;
    getPath(urlPath: string, storePath: string): string;
    timeout(timeout: number): Promise<unknown>;
}
export declare function writeSucessExcuteLog(logPath: string): void;
export declare function writeFailExcuteLog(logPath: string): void;
