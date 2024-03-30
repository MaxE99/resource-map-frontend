import { Dispatch, SetStateAction } from "react";

import { CommodityCountryDataT, PriceT } from "../../utils/types/api";

type PricePlotProps = {
  data: PriceT[] | undefined;
};

type TradeBalancePlotT = {
  feature: GeoJSON.Feature;
  windowWidth: number;
  setIsBalanceLoaded: Dispatch<SetStateAction<boolean>>;
};

type ImportExportTreemapT = {
  feature: GeoJSON.Feature;
  isImportExportLoaded: boolean;
  setIsImportExportLoaded: Dispatch<SetStateAction<boolean>>;
  windowWidth: number;
};

type ResourcePlotT = {
  data: CommodityCountryDataT[];
};

export type {
  PricePlotProps,
  TradeBalancePlotT,
  ImportExportTreemapT,
  ResourcePlotT,
};
