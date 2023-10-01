import { CountryInformationT } from "../../types/country";
import ResourceTable from "./ResourceTable";
import { slugify } from "../../functions/country";
import { COUNTRY_STYLE } from "../../styles/country";
import { DOMAIN } from "../../config";
import ImportExportTreemap from "./ImportExportTreemap";
import ImportExportBalance from "./ImportExportBalance";
import Backdrop from "../Backdrop/Backdrop";
import LoadingProgress from "../LoadingProgress/LoadingProgress";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContextProvider";

const CountryInformation = ({ country }: CountryInformationT): JSX.Element => {
  const [isCountryInfoLoading, setIsCountryInfoLoading] =
    useState<boolean>(true);
  const [isProductionReservesLoaded, setIsProductionReservesLoaded] =
    useState<boolean>(false);
  const [isImportExportLoaded, setIsImportExportLoaded] =
    useState<boolean>(false);
  const [isBalanceLoaded, setIsBalanceLoaded] = useState<boolean>(false);

  const { setIsLoading } = useContext<any>(AppContext);

  useEffect(() => {
    if (isImportExportLoaded && isProductionReservesLoaded && isBalanceLoaded) {
      setIsCountryInfoLoading(false);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isImportExportLoaded, isProductionReservesLoaded, isBalanceLoaded]);

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <div style={COUNTRY_STYLE.COUNTRY_NAME_BOX}>
          <img
            src={
              DOMAIN +
              `/static/flags/${slugify(country?.properties?.ADMIN)}.png`
            }
            style={{
              height: "50px",
              marginRight: "10px",
              border: "1px solid rgba(224, 224, 224, 1)",
            }}
          />
          <div className="countryNameBox" style={{ fontSize: "45px" }}>
            {country.properties?.ADMIN}
          </div>
        </div>
        <ResourceTable
          country={country}
          setIsProductionReservesLoaded={setIsProductionReservesLoaded}
        />
        <ImportExportTreemap
          country={country}
          isImportExportLoaded={isImportExportLoaded}
          setIsImportExportLoaded={setIsImportExportLoaded}
        />
        <ImportExportBalance
          country={country}
          setIsBalanceLoaded={setIsBalanceLoaded}
        />

        {/*<div>GDP Chart:</div>
      <div>Resources as % of GDP Chart:</div>
      <div>Ranking: Resource Dependency:</div> */}
        {/* <div>Ease of Doing Business Index: {country.ease_of_biz}</div>
      <div>Income Group: {country.income_group}</div> */}
      </div>
      {isCountryInfoLoading && (
        <Backdrop
          children={[
            <div
              key="loading"
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LoadingProgress />
            </div>,
          ]}
        />
      )}
    </div>
  );
};

export default CountryInformation;
