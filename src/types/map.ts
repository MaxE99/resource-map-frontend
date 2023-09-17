import { Dispatch, SetStateAction } from "react";

import { CommodityT, GovInfoT, ProductionReservesT } from "./api";

type MapT = {
  countries: GeoJSON.GeoJsonObject | undefined;
  selectedCommodity: CommodityT;
  otherCountries: string | undefined;
  worldTotal: string | undefined;
};

type ResourcePlotT = {
  data: ProductionReservesT[];
};

type GeoJSONDataUpdateT = {
  selectedCommodity: CommodityT;
  queryString: string;
  worldGeojson: GeoJSON.FeatureCollection;
  year: number;
  setGovInfo: Dispatch<SetStateAction<GovInfoT | null>>;
  setOtherCountries: Dispatch<SetStateAction<string | undefined>>;
  setWorldTotal: Dispatch<SetStateAction<string | undefined>>;
  setWorldGeojson: Dispatch<
    SetStateAction<GeoJSON.FeatureCollection | undefined>
  >;
};

export type { MapT, ResourcePlotT, GeoJSONDataUpdateT };
