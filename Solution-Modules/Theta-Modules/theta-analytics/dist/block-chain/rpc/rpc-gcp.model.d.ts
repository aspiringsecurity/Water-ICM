import { CandidateType, HeightListType } from './rpc-vcp.model';
export declare class GcpType {
    SortedGuardians: Array<CandidateType>;
}
export declare class BlockHashGcpPairType {
    BlockHash: string;
    Gcp: GcpType;
    HeightList: HeightListType;
}
export declare class GetGcpByHeightModel {
    BlockHashGcpPairs: [BlockHashGcpPairType];
}
