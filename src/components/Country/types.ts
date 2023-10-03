import { Dispatch, SetStateAction } from "react";
import { CommodityT, ProductionReservesT } from "../../utils/types/api";

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

type CountryInformationPopupT = {
  feature: GeoJSON.Feature;
};

type ResourceTableT = {
  feature: GeoJSON.Feature;
  isProductionReservesLoaded: boolean;
  setIsProductionReservesLoaded: Dispatch<SetStateAction<boolean>>;
};

type CountryStrongholdT = {
  strongholds: ProductionReservesT[];
  setSelectedStrongholds: Dispatch<SetStateAction<ProductionReservesT[]>>;
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
};

type CountryHeaderT = {
  countryName: string;
};

type CountryToggleGroupT = {
  firstChoice: string;
  secondChoice: string;
  currentChoice: string;
  setCurrentChoice: Dispatch<SetStateAction<string>>;
};

export type {
  CountryResourcePopupT,
  CountryInformationPopupT,
  ResourceTableT,
  CountryBalancePopupT,
  CountryStrongholdT,
  CountryHeaderT,
  CountryToggleGroupT,
};
