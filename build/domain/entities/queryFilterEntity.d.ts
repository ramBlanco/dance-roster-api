import { PaginationParams } from "../interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
export declare class QueryFilterEntity {
    private params;
    private queryFilter;
    private pageSize;
    private offset;
    constructor();
    /**
     * hydrate
     */
    hydrate(queryFilter: Record<string, unknown>): void;
    get query(): Record<string, unknown>;
    get where(): Record<string, unknown>;
    get pagination(): PaginationParams;
    setPageSize(pageSize: number): void;
    setPaginationOffset(offset: number): void;
    setParams(key: string, value: unknown, symbolFilter?: symbol): void;
}
