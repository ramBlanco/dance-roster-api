import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";
export declare class QueryFilterHandler {
    private paginationStrategy;
    private eqFilterStrategy;
    private gtFilterStrategy;
    private gteFilterStrategy;
    private ltFilterStrategy;
    private lteFilterStrategy;
    constructor();
    getParams<T>(queryFilter: T): IQueryFilterHandlerResponse;
}
