import { Dispatch, SetStateAction } from "react";
import { CommodityT } from "./api";

type CountryResourcePopupT = {
  feature: GeoJSON.Feature;
  commodity: CommodityT;
  isFeatureBeingHoveredOver: boolean;
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
};

type CountryBalancePopupT = {
  feature: GeoJSON.Feature;
  isFeatureBeingHoveredOver: boolean;
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
};

type CountryInformationT = {
  country: GeoJSON.Feature;
};

type ResourceTableT = {
  country: GeoJSON.Feature;
  setIsProductionReservesLoaded: Dispatch<SetStateAction<boolean>>;
};

type ImportExportTreemapT = {
  country: GeoJSON.Feature;
  isImportExportLoaded: boolean;
  setIsImportExportLoaded: Dispatch<SetStateAction<boolean>>;
};

type ImportExportBalanceProps = {
  country: GeoJSON.Feature;
  setIsBalanceLoaded: Dispatch<SetStateAction<boolean>>;
};

export type {
  CountryResourcePopupT,
  CountryInformationT,
  ResourceTableT,
  ImportExportTreemapT,
  CountryBalancePopupT,
  ImportExportBalanceProps,
};
