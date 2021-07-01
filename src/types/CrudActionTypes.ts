// export interface FilterOptions { }

export interface SortOptions {
  direction: "ASC" | "DESC";
  property: string;
}

export interface SearchOptions {
  pagination: boolean;
  page: number;
  pageSize?: number;
  filters?: object;
  // filters?: {[key: string]: FilterOptions};
  sort?: SortOptions;
}
