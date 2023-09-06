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
  amount: number;
  country_name?: string;
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
  country: string;
  amount: number;
  share: number;
};

type CommodityPriceT = {
  id: number;
  commodity: string;
  description: string;
  date: string;
  price: number;
};

export type {
  CountryT,
  CommodityT,
  ProductionReservesT,
  GovInfoT,
  ImportExportT,
  CommodityPriceT,
};
