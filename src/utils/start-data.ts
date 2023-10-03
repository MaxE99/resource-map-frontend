import { CommodityT } from "./types/api";

import commodities from "../starter_data/commodities.json";
import countries from "../starter_data/countries.json";
import defaultData from "../starter_data/default_selection.json";
import { DefaultCommodityT } from "../components/Map/types";

const DEFAULT_COMMODITIES: DefaultCommodityT[] = defaultData;
const COUNTRIES_DATA: GeoJSON.FeatureCollection =
  countries as GeoJSON.FeatureCollection;
const COMMODITIES_DATA: CommodityT[] = commodities;

export { DEFAULT_COMMODITIES, COUNTRIES_DATA, COMMODITIES_DATA };
