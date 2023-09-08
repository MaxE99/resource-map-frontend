import { Dispatch, ReactNode, SetStateAction } from "react";

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

export type { MarksT, AppContextT, AppContextProviderT };
