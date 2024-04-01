import { PaginationParams } from "../interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";

export class QueryFilterEntity {

  private params: Record<string, unknown>;
  private queryFilter: Record<string, unknown>;
  private pageSize: number;
  private offset: number;

  constructor() {
    this.params = {}
    this.queryFilter = {}

    this.pageSize = 100
    this.offset = 0
  }

  /**
   * hydrate
   */
  public hydrate(queryFilter: Record<string, unknown>): void {
    this.queryFilter = queryFilter
  }

  
  public get query() : Record<string, unknown> {
    return this.queryFilter
  }

  public get where() : Record<string, unknown> {
    return this.params
  }

  public get pagination() : PaginationParams {
    return { offset: this.offset, pageSize: this.pageSize }
  }

  public setPageSize(pageSize: number): void {
    if (Number.isInteger(pageSize)) {
      this.pageSize = pageSize
    }
  }

  public setPaginationOffset(offset: number): void {
    if (Number.isInteger(offset)) {
      this.offset = offset
    }
  }
  
  public setParams(key: string, value: unknown, symbolFilter?: symbol) {
    this.params = symbolFilter ? Object.assign(this.params, { [key]: { [symbolFilter]: value } }) : Object.assign(this.params, { [key]: value })
  }
}