import { Dispatch, SetStateAction } from "react";
import { CommodityT, CountryT } from "./api";

type CountryResourcePopupT = {
  feature: GeoJSON.Feature;
  commodity: CommodityT;
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
};

type CountryInformationT = {
  country: CountryT;
};

export type { CountryResourcePopupT, CountryInformationT };
