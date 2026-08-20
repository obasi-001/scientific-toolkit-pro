export type UnitCategory =
  | "length"
  | "mass"
  | "temperature"
  | "area"
  | "volume"
  | "speed"
  | "time"
  | "data";

export interface UnitOption {
  value: string;
  label: string;
  symbol: string;
}

export interface UnitCategoryOption {
  value: UnitCategory;
  label: string;
  units: UnitOption[];
}