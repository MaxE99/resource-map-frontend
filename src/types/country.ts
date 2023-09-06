import { CommodityT, CountryT } from "./api";

type CountryResourcePopupT = {
  feature: GeoJSON.Feature;
  commodity: CommodityT;
};

type CountryInformationT = {
  country: CountryT;
};

export type { CountryResourcePopupT, CountryInformationT };
