"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EqFilterStrategy = void 0;
const sequelize_1 = require("sequelize");
const queryFilterStrategy_1 = require("./queryFilterStrategy");
class EqFilterStrategy extends queryFilterStrategy_1.QueryFilterStrategy {
    constructor() {
        super(...arguments);
        this.filterSymbol = '[eq]';
        this.symbolQuery = sequelize_1.Op.eq;
    }
}
exports.EqFilterStrategy = EqFilterStrategy;
