import { QueryFilterEntity } from "../../../domain/entities/queryFilterEntity";
import { IQueryFilterStrategy } from "../../../domain/interfaces/strategies/queryFilter/queryFilterHandlerInterface";
export declare abstract class QueryFilterStrategy implements IQueryFilterStrategy {
    abstract filterSymbol: string;
    abstract symbolQuery?: symbol;
    private nextHandler;
    setNext(handler: IQueryFilterStrategy): IQueryFilterStrategy;
    getAndParseParams(request: QueryFilterEntity): void;
    handle(request: QueryFilterEntity): string | null;
}
