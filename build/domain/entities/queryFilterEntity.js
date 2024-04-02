"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFilterEntity = void 0;
class QueryFilterEntity {
    constructor() {
        this.params = {};
        this.queryFilter = {};
        this.pageSize = 100;
        this.offset = 0;
    }
    /**
     * hydrate
     */
    hydrate(queryFilter) {
        this.queryFilter = queryFilter;
    }
    get query() {
        return this.queryFilter;
    }
    get where() {
        return this.params;
    }
    get pagination() {
        return { offset: this.offset, pageSize: this.pageSize };
    }
    setPageSize(pageSize) {
        if (Number.isInteger(pageSize)) {
            this.pageSize = pageSize;
        }
    }
    setPaginationOffset(offset) {
        if (Number.isInteger(offset)) {
            this.offset = offset;
        }
    }
    setParams(key, value, symbolFilter) {
        this.params = symbolFilter ? Object.assign(this.params, { [key]: { [symbolFilter]: value } }) : Object.assign(this.params, { [key]: value });
    }
}
exports.QueryFilterEntity = QueryFilterEntity;
