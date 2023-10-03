import { createContext, useState } from "react";

import { AppContextProviderT, AppContextT } from "../utils/types/base";

export const AppContext = createContext<AppContextT | undefined>(undefined);

const AppContextProvider = ({ children }: AppContextProviderT) => {
  const [selectedCountry, setSelectedCountry] =
    useState<GeoJSON.Feature | null>(null);
  const [isShowingProduction, setIsShowingProduction] = useState<boolean>(true);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <AppContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        isShowingProduction,
        setIsShowingProduction,
        dialogIsOpen,
        setDialogIsOpen,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
