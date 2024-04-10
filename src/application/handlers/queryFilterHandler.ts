import { GtFilterStrategy } from "../../infrastructure/strategies/queryFilter/gtFilterStrategy";
import { QueryFilterEntity } from "../../domain/entities/queryFilterEntity";
import { EqFilterStrategy } from "../../infrastructure/strategies/queryFilter/eqFilterStrategy";
import { PaginationStrategy } from "../../infrastructure/strategies/queryFilter/paginationStrategy";
import { LtFilterStrategy } from "../../infrastructure/strategies/queryFilter/ltFilterStrategy";
import { LteFilterStrategy } from "../../infrastructure/strategies/queryFilter/lteFilterStrategy";
import { GteFilterStrategy } from "../../infrastructure/strategies/queryFilter/gteFilterStrategy";
import { IQueryFilterHandlerResponse } from "../../domain/interfaces/strategies/queryFilter/queryFilterHandlerResponseInterface";

export class QueryFilterHandler {
  private paginationStrategy: PaginationStrategy;
  private eqFilterStrategy: EqFilterStrategy;
  private gtFilterStrategy: GtFilterStrategy;
  private gteFilterStrategy: GteFilterStrategy;
  private ltFilterStrategy: LtFilterStrategy;
  private lteFilterStrategy: LteFilterStrategy;

  constructor() {
    this.paginationStrategy = new PaginationStrategy()
    this.eqFilterStrategy = new EqFilterStrategy()
    this.gtFilterStrategy = new GtFilterStrategy()
    this.gteFilterStrategy = new GteFilterStrategy()
    this.ltFilterStrategy = new LtFilterStrategy()
    this.lteFilterStrategy = new LteFilterStrategy()

    this.paginationStrategy
      .setNext(this.eqFilterStrategy)
      .setNext(this.gtFilterStrategy)
      .setNext(this.gteFilterStrategy)
      .setNext(this.ltFilterStrategy)
      .setNext(this.lteFilterStrategy)
  }

  getParams<T>(queryFilter: T): IQueryFilterHandlerResponse {
    const queryFilterEntity = new QueryFilterEntity()
    queryFilterEntity.hydrate(queryFilter as Record<string, unknown>)

    this.paginationStrategy.handle(queryFilterEntity)

    return {
      where: queryFilterEntity.where || null,
      pagination: queryFilterEntity.pagination
    }
  }
}