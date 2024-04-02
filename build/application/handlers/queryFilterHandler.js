"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFilterHandler = void 0;
const gtFilterStrategy_1 = require("../../infrastructure/strategies/queryFilter/gtFilterStrategy");
const queryFilterEntity_1 = require("../../domain/entities/queryFilterEntity");
const eqFilterStrategy_1 = require("../../infrastructure/strategies/queryFilter/eqFilterStrategy");
const paginationStrategy_1 = require("../../infrastructure/strategies/queryFilter/paginationStrategy");
const ltFilterStrategy_1 = require("../../infrastructure/strategies/queryFilter/ltFilterStrategy");
const lteFilterStrategy_1 = require("../../infrastructure/strategies/queryFilter/lteFilterStrategy");
const gteFilterStrategy_1 = require("../../infrastructure/strategies/queryFilter/gteFilterStrategy");
class QueryFilterHandler {
    constructor() {
        this.paginationStrategy = new paginationStrategy_1.PaginationStrategy();
        this.eqFilterStrategy = new eqFilterStrategy_1.EqFilterStrategy();
        this.gtFilterStrategy = new gtFilterStrategy_1.GtFilterStrategy();
        this.gteFilterStrategy = new gteFilterStrategy_1.GteFilterStrategy();
        this.ltFilterStrategy = new ltFilterStrategy_1.LtFilterStrategy();
        this.lteFilterStrategy = new lteFilterStrategy_1.LteFilterStrategy();
        this.paginationStrategy
            .setNext(this.eqFilterStrategy)
            .setNext(this.gtFilterStrategy)
            .setNext(this.gteFilterStrategy)
            .setNext(this.ltFilterStrategy)
            .setNext(this.lteFilterStrategy);
    }
    getParams(queryFilter) {
        const queryFilterEntity = new queryFilterEntity_1.QueryFilterEntity();
        queryFilterEntity.hydrate(queryFilter);
        this.paginationStrategy.handle(queryFilterEntity);
        return {
            where: queryFilterEntity.where,
            pagination: queryFilterEntity.pagination
        };
    }
}
exports.QueryFilterHandler = QueryFilterHandler;
