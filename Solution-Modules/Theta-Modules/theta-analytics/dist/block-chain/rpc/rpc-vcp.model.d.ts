export declare class CandidateStakeType {
    source: string;
    amount: string;
    withdrawn: boolean;
    return_height: string;
}
export declare class CandidateType {
    Holder: string;
    Stakes: Array<CandidateStakeType>;
}
export declare class VcpPairType {
    BlockHash: string;
    SortedCandidates: Array<CandidateType>;
}
export declare class HeightListType {
    Heights: Array<number>;
}
export declare class BlockHashVcpPair {
    BlockHash: string;
    Vcp: VcpPairType;
    HeightList: HeightListType;
}
export declare class GetVcpByHeightModel {
    BlockHashVcpPairs: Array<BlockHashVcpPair>;
}
