import { Dispatch, SetStateAction } from "react";
import { CommodityT, ProductionReservesT } from "../../utils/types/api";

type CountryResourcePopupT = {
  feature: GeoJSON.Feature;
  commodity: CommodityT;
  isFeatureHovered: boolean;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
};

type CountryBalancePopupT = {
  feature: GeoJSON.Feature;
  isFeatureHovered: boolean;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
};

type CountryInformationPopupT = {
  feature: GeoJSON.Feature;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
};

type ResourceTableT = {
  feature: GeoJSON.Feature;
  isProductionReservesLoaded: boolean;
  setIsProductionReservesLoaded: Dispatch<SetStateAction<boolean>>;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
};

type CountryStrongholdT = {
  strongholds: ProductionReservesT[];
  setSelectedStrongholds: Dispatch<SetStateAction<ProductionReservesT[]>>;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
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
