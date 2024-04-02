import { QueryFilterEntity } from "../../../domain/entities/queryFilterEntity";
import { QueryFilterStrategy } from "./queryFilterStrategy";
export declare class PaginationStrategy extends QueryFilterStrategy {
    filterSymbol: string;
    symbolQuery: undefined;
    getAndParseParams(request: QueryFilterEntity): void;
}
