"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFilterStrategy = void 0;
class QueryFilterStrategy {
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }
    getAndParseParams(request) {
        Object.entries(request.query).forEach(([key, value]) => {
            if (key.includes(this.filterSymbol)) {
                const keyName = key.replace(this.filterSymbol, '');
                request.setParams(keyName, value, this.symbolQuery);
            }
        });
    }
    handle(request) {
        this.getAndParseParams(request);
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}
exports.QueryFilterStrategy = QueryFilterStrategy;
