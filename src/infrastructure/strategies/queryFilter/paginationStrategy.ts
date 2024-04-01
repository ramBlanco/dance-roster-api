import { QueryFilterEntity } from "../../../domain/entities/queryFilterEntity";
import { QueryFilterStrategy } from "./queryFilterStrategy";
import { Op } from "sequelize";

export class PaginationStrategy extends QueryFilterStrategy {
  filterSymbol = '';
  symbolQuery = undefined;

  public getAndParseParams(request: QueryFilterEntity): void {
    const pageSize = Number(request.query['pageSize'])
    const offset = Number(request.query['offset'])

    request.setPageSize(pageSize)
    request.setPaginationOffset(offset)
  }
}