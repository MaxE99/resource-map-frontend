import {
  CommodityPriceT,
  CommodityT,
  GovInfoT,
  ProductionReservesT,
} from "./types/api";

import commodities from "./starter_data/commodities.json";
import countries from "./starter_data/countries.json";
import defaultData from "./starter_data/default_selection.json";

type DefaultCommodityT = {
  commodity: CommodityT;
  gov_info: GovInfoT;
  production: ProductionReservesT[];
  prices: CommodityPriceT[];
};

const DEFAULT_COMMODITIES: DefaultCommodityT[] = defaultData;
const COUNTRIES_DATA: GeoJSON.FeatureCollection =
  countries as GeoJSON.FeatureCollection;
const COMMODITIES_DATA: CommodityT[] = commodities;

export { DEFAULT_COMMODITIES, COUNTRIES_DATA, COMMODITIES_DATA };
export type { DefaultCommodityT };
