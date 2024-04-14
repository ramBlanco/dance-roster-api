export interface IPaginationResponseRepository<T> {
  count: number
  rows: T[]
}