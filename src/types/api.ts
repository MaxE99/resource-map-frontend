type CountryT = {
  id: number;
  name: string;
  flag_path: string;
  ease_of_biz: number | null;
  income_group: string | null;
  gdp: number | null;
  geojson: GeoJSON.Feature;
};

type CommodityT = {
  id: number;
  name: string;
  info: string;
  img_path: string;
  companies: string[];
};

type ProductionReservesT = {
  id: number;
  year: number;
  country: string;
  commodity: string;
  note: string | null;
  metric: string;
  amount: string;
  country_name: string;
  commodity_name: string;
  share: number;
  rank: number;
};

type GovInfoT = {
  id: number;
  year: number;
  commodity: string;
  prod_and_use: string;
  recycling: string;
  events: string;
  world_resources: string;
  substitutes: string;
};

type ImportExportT = {
  id: number;
  year: number;
  country_name: string;
  amount: number;
  share: number;
  commodity_name: string;
};

type CommodityPriceT = {
  id: number;
  commodity: string;
  description: string;
  date: string;
  price: number;
};

type ImportExportBalanceT = {
  id: number;
  year: number;
  country: string;
  total_impmorts: number;
  total_exports: number;
  total_commodity_imports: number;
  total_commodity_exports: number;
};

export type {
  CountryT,
  CommodityT,
  ProductionReservesT,
  GovInfoT,
  ImportExportT,
  CommodityPriceT,
  ImportExportBalanceT,
};
