export declare class SolcService {
    getVersionList(): Promise<unknown>;
    downloadBinary(outputName: any, version: any, expectedHash: any): Promise<unknown>;
    downloadAll(prefix: string): Promise<void>;
    downloadByVersion(version: string, prefix: string): Promise<unknown>;
}
