"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GtFilterStrategy = void 0;
const sequelize_1 = require("sequelize");
const queryFilterStrategy_1 = require("./queryFilterStrategy");
class GtFilterStrategy extends queryFilterStrategy_1.QueryFilterStrategy {
    constructor() {
        super(...arguments);
        this.filterSymbol = '[gt]';
        this.symbolQuery = sequelize_1.Op.gt;
    }
}
exports.GtFilterStrategy = GtFilterStrategy;
