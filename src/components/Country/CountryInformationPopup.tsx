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
  isFeatureHovered,
  year,
  setYear,
  windowWidth,
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
    <div
      style={{
        backgroundColor: "var(--main-background)",
      }}
    >
      <div
        style={{
          padding: "20px",
        }}
      >
        <CountryHeader
          countryName={feature?.properties?.ADMIN}
          isHovered={isFeatureHovered}
        />
        <ResourceTable
          feature={feature}
          isProductionReservesLoaded={isProductionReservesLoaded}
          setIsProductionReservesLoaded={setIsProductionReservesLoaded}
          year={year}
          setYear={setYear}
          windowWidth={windowWidth}
        />
        <ImportExportTreemap
          feature={feature}
          isImportExportLoaded={isImportExportLoaded}
          setIsImportExportLoaded={setIsImportExportLoaded}
          windowWidth={windowWidth}
        />
        <TradeBalancePlot
          feature={feature}
          setIsBalanceLoaded={setIsBalanceLoaded}
          windowWidth={windowWidth}
        />
      </div>
      {isCountryInfoLoading && <BackdropWrapper />}
    </div>
  );
};

export default CountryInformationPopup;
