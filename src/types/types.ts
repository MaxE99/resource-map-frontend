type Country = {
  id: number;
  name: string;
  flag_path: string;
  ease_of_biz: number | null;
  income_group: string | null;
  gdp: number | null;
};

type Commodity = {
  id: number;
  name: string;
};

type ProductionReserves = {
  id: number;
  year: number;
  country: string;
  commodity: string;
  note: string | null;
  metric: string;
  amount: string;
};

type GovInfo = {
  id: number;
  year: number;
  commodity: string;
  prod_and_use: string;
  recycling: string;
  events: string;
  world_resources: string;
  substitutes: string;
};

type ImportExport = {
  id: number;
  year: number;
  country: string;
  amount: number;
  share: number;
};

export type { Country, Commodity, ProductionReserves, GovInfo, ImportExport };
