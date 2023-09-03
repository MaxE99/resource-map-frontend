import { createContext, useState } from "react";

export const AppContext = createContext<any>(null);

const AppContextProvider = ({ children }: any) => {
  const [selectedCountry, setSelectedCountry] = useState();
  const [isShowingProduction, setIsShowingProduction] = useState<boolean>(true);
  return (
    <AppContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        isShowingProduction,
        setIsShowingProduction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
