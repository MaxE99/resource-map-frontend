import { Dispatch, SetStateAction } from "react";

import { StrongholdT } from "../../utils/types/api";

type CountryResourcePopupT = {
  feature: GeoJSON.Feature;
  commodity: string;
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
  isFeatureHovered: boolean;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  windowWidth: number;
};

type ResourceTableT = {
  feature: GeoJSON.Feature;
  isProductionReservesLoaded: boolean;
  setIsProductionReservesLoaded: Dispatch<SetStateAction<boolean>>;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  windowWidth: number;
};

type CountryStrongholdPopupT = {
  isFeatureHovered: boolean;
  strongholds: StrongholdT[];
  setSelectedStrongholds: Dispatch<SetStateAction<StrongholdT[]>>;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
};

type CountryHeaderT = {
  countryName: string;
  isHovered: boolean;
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
  CountryStrongholdPopupT,
  CountryHeaderT,
  CountryToggleGroupT,
};
