import { CommodityT, ProductionReservesT } from "./api";

type MapT = {
  countries: GeoJSON.GeoJsonObject;
  selectedCommodity: CommodityT | undefined;
  otherCountries: string | undefined;
  worldTotal: string | undefined;
};

type ResourcePlotT = {
  data: ProductionReservesT[];
};

export type { MapT, ResourcePlotT };
