import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  CommodityPriceT,
  CommodityT,
  GovInfoT,
  ProductionReservesT,
} from "./api";

type MarksT = {
  value: number;
  label: string;
};

type AppContextT = {
  selectedCountry: GeoJSON.Feature | null;
  setSelectedCountry: Dispatch<SetStateAction<GeoJSON.Feature | null>>;
  isShowingProduction: boolean;
  setIsShowingProduction: Dispatch<SetStateAction<boolean>>;
  dialogIsOpen: boolean;
  setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type AppContextProviderT = {
  children: ReactNode;
};

type DefaultCommodityT = {
  commodity: CommodityT;
  gov_info: GovInfoT;
  production: ProductionReservesT[];
  prices: CommodityPriceT[];
};

type AddGeoJSONInfoT = {
  selectedCommodity: DefaultCommodityT;
  setWorldGeojson: Dispatch<
    SetStateAction<GeoJSON.FeatureCollection | undefined>
  >;
  setOtherCountries: Dispatch<SetStateAction<string | undefined>>;
  setWorldTotal: Dispatch<SetStateAction<string | undefined>>;
};

export type {
  MarksT,
  AppContextT,
  AppContextProviderT,
  AddGeoJSONInfoT,
  DefaultCommodityT,
};
