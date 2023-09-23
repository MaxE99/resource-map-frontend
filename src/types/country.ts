import { Dispatch, SetStateAction } from "react";
import { CommodityT } from "./api";

type CountryResourcePopupT = {
  feature: GeoJSON.Feature;
  commodity: CommodityT;
  isFeatureBeingHoveredOver: boolean;
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
};

type CountryInformationT = {
  country: GeoJSON.Feature;
};

export type { CountryResourcePopupT, CountryInformationT };
