import { createContext, useState } from "react";

export const AppContext = createContext<any>(null);

const AppContextProvider = ({ children }: any) => {
  const [selectedCountry, setSelectedCountry] = useState();
  return (
    <AppContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
