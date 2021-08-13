export interface StringModeFilterOption {
  mode: string;
  value: string;
}

export interface MinMaxFilterOption {
  min: string | number;
  max?: string | number;
}

export type FilterOptions =
  | StringModeFilterOption
  | MinMaxFilterOption
  | string
  | number;

export interface SortOptions {
  direction: 'asc' | 'desc';
  property: string;
}

export interface SearchOptions {
  pagination: boolean;
  page: number;
  pageSize?: number;
  filters?: Record<string, FilterOptions>;
  sort?: SortOptions;
}

export interface ExportOptions
  extends Omit<SearchOptions, 'pagination' | 'page' | 'pageSize'> {
  title: string;
  sheetName?: string;
  omitProps?: string[];
}
