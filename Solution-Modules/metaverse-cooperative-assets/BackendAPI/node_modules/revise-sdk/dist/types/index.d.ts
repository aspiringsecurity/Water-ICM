/**
 * Model User
 *
 */
export declare type User = {
    id: string;
    email: string;
    username: string | null;
    createdAt: Date;
    updatedAt: Date;
};
/**
 * Model Collection
 *
 */
export declare type Collection = {
    id: string;
    collectionName: string | null;
    collectionURI: string;
    infoId: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
};
/**
 * Model CollectionInfo
 *
 */
export declare type CollectionInfo = {
    id: string;
    collectionName: string | null;
    collectionURI: string;
    createdAt: Date;
    updatedAt: Date;
};
/**
 * Model NFT
 *
 */
export declare type NFT = {
    id: string;
    format: string;
    tokenId: string | null;
    name: string | null;
    image: string | null;
    description: string | null;
    metaData: string | null;
    collectionId: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
};
/**
 * Model NFTRevision
 *
 */
export declare type NFTRevision = {
    id: string;
    nftId: string;
    tokenId: string | null;
    name: string | null;
    image: string | null;
    description: string | null;
    metaData: string | null;
    createdAt: Date;
    updatedAt: Date;
};
