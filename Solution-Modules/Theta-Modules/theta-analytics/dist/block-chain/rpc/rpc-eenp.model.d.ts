import { CandidateType, HeightListType } from './rpc-vcp.model';
export declare class BlockHashEenpPairType {
    BlockHash: string;
    EENs: Array<CandidateType>;
    HeightList: HeightListType;
}
export declare class GetEenpByHeightModel {
    BlockHashEenpPairs: [BlockHashEenpPairType];
}
