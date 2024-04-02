"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LtFilterStrategy = void 0;
const sequelize_1 = require("sequelize");
const queryFilterStrategy_1 = require("./queryFilterStrategy");
class LtFilterStrategy extends queryFilterStrategy_1.QueryFilterStrategy {
    constructor() {
        super(...arguments);
        this.filterSymbol = '[lt]';
        this.symbolQuery = sequelize_1.Op.lt;
    }
}
exports.LtFilterStrategy = LtFilterStrategy;
