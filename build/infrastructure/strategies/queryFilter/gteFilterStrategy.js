"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GteFilterStrategy = void 0;
const sequelize_1 = require("sequelize");
const queryFilterStrategy_1 = require("./queryFilterStrategy");
class GteFilterStrategy extends queryFilterStrategy_1.QueryFilterStrategy {
    constructor() {
        super(...arguments);
        this.filterSymbol = '[gte]';
        this.symbolQuery = sequelize_1.Op.gte;
    }
}
exports.GteFilterStrategy = GteFilterStrategy;
