import { Op } from "sequelize";
import { QueryFilterStrategy } from "./queryFilterStrategy";

export class GtFilterStrategy extends QueryFilterStrategy {
  filterSymbol = '[gt]';
  symbolQuery = Op.gt;
}