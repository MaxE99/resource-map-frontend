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
  isImportExportLoaded: boolean;
  setIsProductionReservesLoaded: Dispatch<SetStateAction<boolean>>;
};

type ImportExportTreemapT = {
  country: GeoJSON.Feature;
  isProductionReservesLoaded: boolean;
  setIsImportExportLoaded: Dispatch<SetStateAction<boolean>>;
};

export type {
  CountryResourcePopupT,
  CountryInformationT,
  ResourceTableT,
  ImportExportTreemapT,
  CountryBalancePopupT,
};
