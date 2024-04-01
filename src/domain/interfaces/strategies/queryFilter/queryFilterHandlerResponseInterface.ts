export interface PaginationParams {
  pageSize: number
  offset: number
}

export interface IQueryFilterHandlerResponse {
  where: Record<string, unknown>
  pagination: PaginationParams
}