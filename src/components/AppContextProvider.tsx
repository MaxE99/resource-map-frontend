import { createContext, useState } from "react";

import { AppContextProviderT, AppContextT } from "../types/base";

export const AppContext = createContext<AppContextT | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderT) => {
  const [selectedCountry, setSelectedCountry] =
    useState<GeoJSON.Feature | null>(null);
  const [isShowingProduction, setIsShowingProduction] = useState<boolean>(true);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        isShowingProduction,
        setIsShowingProduction,
        dialogIsOpen,
        setDialogIsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
