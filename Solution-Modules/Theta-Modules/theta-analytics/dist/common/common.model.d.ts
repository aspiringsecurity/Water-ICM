import { Type } from '@nestjs/common';
export interface IPaginatedType<T> {
    nodes: T[];
    totalCount: number;
    hasNextPage: boolean;
    skip: number;
    endCursor: string;
}
export declare function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>>;
