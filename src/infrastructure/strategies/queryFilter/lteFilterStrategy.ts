import { Op } from "sequelize";
import { QueryFilterStrategy } from "./queryFilterStrategy";

export class LteFilterStrategy extends QueryFilterStrategy {
  filterSymbol = '[lte]';
  symbolQuery = Op.lte;
}