import { Op } from "sequelize";
import { QueryFilterStrategy } from "./queryFilterStrategy";

export class GteFilterStrategy extends QueryFilterStrategy {
  filterSymbol = '[gte]';
  symbolQuery = Op.gte;
}