import { IQueryRequest } from "../../queryRequestInterface";

export interface IEventPersonIndexRequest extends IQueryRequest {
  eventId: string
}
