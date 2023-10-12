import { CountryInformationPopupT } from "./types";
import ResourceTable from "./ResourceTable";
import ImportExportTreemap from "../Plots/ImportExportTreemap";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContextProvider";
import CountryHeader from "./CountryHeader";
import TradeBalancePlot from "../Plots/TradeBalancePlot";
import BackdropWrapper from "../Backdrop/BackdropWrapper";

const CountryInformationPopup = ({
  feature,
  year,
  setYear,
}: CountryInformationPopupT): JSX.Element => {
  const [isCountryInfoLoading, setIsCountryInfoLoading] =
    useState<boolean>(true);
  const [isProductionReservesLoaded, setIsProductionReservesLoaded] =
    useState<boolean>(false);
  const [isImportExportLoaded, setIsImportExportLoaded] =
    useState<boolean>(false);
  const [isBalanceLoaded, setIsBalanceLoaded] = useState<boolean>(false);

  const { setIsLoading } = useContext<any>(AppContext);

  useEffect(() => {
    setIsCountryInfoLoading(
      !(isImportExportLoaded && isProductionReservesLoaded && isBalanceLoaded),
    );
  }, [isImportExportLoaded, isProductionReservesLoaded, isBalanceLoaded]);

  useEffect(() => {
    setIsLoading(isCountryInfoLoading);
  }, [isCountryInfoLoading]);

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <CountryHeader countryName={feature?.properties?.ADMIN} />
        <ResourceTable
          feature={feature}
          isProductionReservesLoaded={isProductionReservesLoaded}
          setIsProductionReservesLoaded={setIsProductionReservesLoaded}
          year={year}
          setYear={setYear}
        />
        <ImportExportTreemap
          feature={feature}
          isImportExportLoaded={isImportExportLoaded}
          setIsImportExportLoaded={setIsImportExportLoaded}
        />
        <TradeBalancePlot
          feature={feature}
          setIsBalanceLoaded={setIsBalanceLoaded}
        />
      </div>
      {isCountryInfoLoading && <BackdropWrapper />}
    </div>
  );
};

export default CountryInformationPopup;
