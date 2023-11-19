import { Dispatch, SetStateAction } from "react";
import { CommodityPriceT, ProductionReservesT } from "../../utils/types/api";

type PricePlotProps = {
  data: CommodityPriceT[] | undefined;
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
  data: ProductionReservesT[];
};

export type {
  PricePlotProps,
  TradeBalancePlotT,
  ImportExportTreemapT,
  ResourcePlotT,
};
