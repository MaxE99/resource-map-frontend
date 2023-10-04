import { CommodityT } from "../../utils/types/api";

type MapT = {
  countries: GeoJSON.GeoJsonObject | undefined;
  selectedCommodity: CommodityT;
  otherCountries: string | undefined;
  worldTotal: string | undefined;
  noDataFound: boolean;
  isBalanceModeSelected: boolean;
  isStrongholdModeSelected: boolean;
};

export type { MapT };
