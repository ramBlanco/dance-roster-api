import { QueryFilterEntity } from "../../../domain/entities/queryFilterEntity";
import { IQueryFilterStrategy } from "../../../domain/interfaces/strategies/queryFilter/queryFilterHandlerInterface";

export abstract class QueryFilterStrategy implements IQueryFilterStrategy {
  abstract filterSymbol: string;
  abstract symbolQuery?: symbol;

  private nextHandler: IQueryFilterStrategy | undefined;

  public setNext(handler: IQueryFilterStrategy): IQueryFilterStrategy {
    this.nextHandler = handler;
    return handler;
  }

  public getAndParseParams(request: QueryFilterEntity): void {
    Object.entries(request.query).forEach(([key, value]) => {
      if (key.includes(this.filterSymbol)) {
        const keyName = key.replace(this.filterSymbol, '')
        request.setParams(keyName, value, this.symbolQuery)
      }
    })
  }

  public handle(request: QueryFilterEntity): string | null {
    this.getAndParseParams(request)
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}