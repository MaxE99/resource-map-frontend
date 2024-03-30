import { Dispatch, ReactNode, SetStateAction } from "react";

import { CommodityT, GovInfoT, PriceT, ProductionReservesT } from "./api";

type MarksT = {
  value: number;
  label: string;
};

type AppContextT = {
  selectedCountry: GeoJSON.Feature | null;
  setSelectedCountry: Dispatch<SetStateAction<GeoJSON.Feature | null>>;
  isShowingProduction: boolean;
  setIsShowingProduction: Dispatch<SetStateAction<boolean>>;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
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
  prices: PriceT[];
};

type AddGeoJSONInfoT = {
  selectedCommodity: DefaultCommodityT;
  setWorldGeojson: Dispatch<
    SetStateAction<GeoJSON.FeatureCollection | undefined>
  >;
  setOtherCountries: Dispatch<SetStateAction<string | undefined>>;
  setWorldTotal: Dispatch<SetStateAction<string | undefined>>;
};

type GeoJSONDataUpdateT = {
  selectedCommodity: CommodityT;
  queryString: string;
  worldGeojson: GeoJSON.FeatureCollection;
  year: number;
  setGovInfo: Dispatch<SetStateAction<GovInfoT | null>>;
  setOtherCountries: Dispatch<SetStateAction<string | undefined>>;
  setWorldTotal: Dispatch<SetStateAction<string | undefined>>;
  setWorldGeojson: Dispatch<
    SetStateAction<GeoJSON.FeatureCollection | undefined>
  >;
  setNoDataFound: Dispatch<SetStateAction<boolean>>;
};

export type {
  MarksT,
  AppContextT,
  AppContextProviderT,
  AddGeoJSONInfoT,
  DefaultCommodityT,
  GeoJSONDataUpdateT,
};
