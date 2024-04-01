import { QueryFilterEntity } from "../../../../domain/entities/queryFilterEntity";

export interface IQueryFilterStrategy {
  setNext(handler: IQueryFilterStrategy): IQueryFilterStrategy;
  handle(request: QueryFilterEntity): string | null;
}