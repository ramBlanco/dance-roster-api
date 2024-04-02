"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LteFilterStrategy = void 0;
const sequelize_1 = require("sequelize");
const queryFilterStrategy_1 = require("./queryFilterStrategy");
class LteFilterStrategy extends queryFilterStrategy_1.QueryFilterStrategy {
    constructor() {
        super(...arguments);
        this.filterSymbol = '[lte]';
        this.symbolQuery = sequelize_1.Op.lte;
    }
}
exports.LteFilterStrategy = LteFilterStrategy;
