import { Op } from "sequelize";
import { QueryFilterStrategy } from "./queryFilterStrategy";

export class EqFilterStrategy extends QueryFilterStrategy {
  filterSymbol = '[eq]';
  symbolQuery = Op.eq;
}