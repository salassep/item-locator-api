export type paging = {
  size: number;
  totalPage: number,
  currentPage: number,
}

export type Pageable<T> = {
  data: Array<T>,
  paging: paging
}
