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
  note: string | null;
  metric: string;
  amount: string;
  country: string;
  commodity: string;
  share: string | null;
  rank: number | null;
};

type ImportExportBalanceT = {
  country: string;
  total_commodity_imports: string; // -> number
  total_commodity_exports: string; // -> number
};

type ImportExportBalanceResT = {
  result: string; // -> number
  data: ImportExportBalanceT[];
};

type StrongholdT = {
  country: string;
  commodity: string;
  share: string; // -> number
};

type StrongholdResT = {
  result: string; // -> number
  data: StrongholdT[];
};

type GovInfoT = {
  year: string; // -> number
  prod_and_use: string;
  recycling: string;
  events: string;
  world_resources: string;
  substitutes: string;
};

type GovInfoResT = {
  result: string; // -> number
  data: GovInfoT;
};

type PriceT = {
  date: string;
  price: string; // -> number
};

type PriceResT = {
  result: string; // -> number
  data: PriceT[];
};

type CommodityCountryDataT = {
  amount: string;
  year: string; // -> number
  metric: string;
};

type CommodityCountryDataResT = {
  result: string; // -> number
  data: CommodityCountryDataT[];
};

type CountryResourceTableT = {
  commodity: string;
  amount: string; // -> number
  metric: string;
  rank: string; // -> number
  share: string; // -> number
};

type CountryResourceTableResT = {
  result: string; // -> number
  data: CountryResourceTableT[];
};

type TradeBalanceT = {
  year: string; // -> number
  total_imports: string; // -> number
  total_exports: string; // -> number
  total_commodity_imports: string; // -> number
  total_commodity_exports: string; // -> number
};

type TradeBalanceResT = {
  result: string; // -> number
  data: TradeBalanceT[];
};

export type {
  CommodityT,
  ProductionReservesT,
  ImportExportBalanceT,
  ImportExportBalanceResT,
  StrongholdT,
  StrongholdResT,
  GovInfoT,
  GovInfoResT,
  PriceT,
  PriceResT,
  CommodityCountryDataT,
  CommodityCountryDataResT,
  CountryResourceTableT,
  CountryResourceTableResT,
  TradeBalanceT,
  TradeBalanceResT,
};
