import { Op } from "sequelize";
import { QueryFilterStrategy } from "./queryFilterStrategy";

export class LtFilterStrategy extends QueryFilterStrategy {
  filterSymbol = '[lt]';
  symbolQuery = Op.lt;
}