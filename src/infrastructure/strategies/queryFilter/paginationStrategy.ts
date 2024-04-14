import { QueryFilterEntity } from "../../../domain/entities/queryFilterEntity";
import { QueryFilterStrategy } from "./queryFilterStrategy";
import { Op } from "sequelize";

export class PaginationStrategy extends QueryFilterStrategy {
  filterSymbol = '';
  symbolQuery = undefined;

  public getAndParseParams(request: QueryFilterEntity): void {
    const page = Number(request.query['page'] || 1)
    const pageSize = Number(request.query['pageSize'])
    let offset = Number(request.query['offset'])
    
    if (!offset && (pageSize && page && page > 1)) offset = (page * pageSize) - pageSize
    
    request.setPageSize(pageSize)
    request.setPaginationOffset(offset)
  }
}