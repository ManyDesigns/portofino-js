export type PropertyType = "string" | "number" | "date" | "boolean";

export interface EntityProperty {
  name: string;
  label: string;
  type: PropertyType;
  enabled: boolean;
  insertable: boolean;
  updatable: boolean;
  inSummary: boolean;
  searchable: boolean;
  annotations: string[];
}
