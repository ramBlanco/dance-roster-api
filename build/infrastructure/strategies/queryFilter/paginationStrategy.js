"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationStrategy = void 0;
const queryFilterStrategy_1 = require("./queryFilterStrategy");
class PaginationStrategy extends queryFilterStrategy_1.QueryFilterStrategy {
    constructor() {
        super(...arguments);
        this.filterSymbol = '';
        this.symbolQuery = undefined;
    }
    getAndParseParams(request) {
        const pageSize = Number(request.query['pageSize']);
        const offset = Number(request.query['offset']);
        request.setPageSize(pageSize);
        request.setPaginationOffset(offset);
    }
}
exports.PaginationStrategy = PaginationStrategy;
