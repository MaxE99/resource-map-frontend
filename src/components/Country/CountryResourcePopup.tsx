import { useContext, useEffect, useState, Fragment } from "react";

import ResourcePlot from "./ResourcePlot";
import { AppContext } from "../AppContextProvider";
import { CountryResourcePopupT } from "../../types/country";
import { ProductionReservesT } from "../../types/api";
import { COUNTRY_STYLE } from "../../styles/country";
import { BASE_STYLE } from "../../styles/base";
import { fetchProductionData, fetchReservesData } from "../../functions/api";
import { DOMAIN } from "../../config";
import { slugify } from "../../functions/country";

const CountryResourcePopup = ({
  feature,
  commodity,
}: CountryResourcePopupT): JSX.Element => {
  const [productionData, setProductionData] = useState<ProductionReservesT[]>();
  const [reserveData, setReserveData] = useState<ProductionReservesT[]>();
  const { setDialogIsOpen, setIsLoading } = useContext<any>(AppContext);

  useEffect(() => {
    if (feature?.properties) {
      setIsLoading(true);
      fetchProductionData(undefined, commodity.name, feature.properties.ADMIN)
        .then((data: ProductionReservesT[]) => {
          const sortedData = data.sort(
            (a: ProductionReservesT, b: ProductionReservesT) => a.year - b.year
          );
          setProductionData(sortedData);
        })
        .catch((error) =>
          console.error("Error fetching production data:", error)
        );

      fetchReservesData(undefined, commodity.name, feature.properties.ADMIN)
        .then((data: ProductionReservesT[]) => {
          const sortedData = data.sort(
            (a: ProductionReservesT, b: ProductionReservesT) => a.year - b.year
          );
          setReserveData(sortedData);
        })
        .catch((error) => console.error("Error fetching reserves data:", error))
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <div>
      <div
        style={COUNTRY_STYLE.COUNTRY_NAME_BOX}
        onClick={() => setDialogIsOpen(true)}
      >
        <img
          src={
            DOMAIN + `/static/flags/${slugify(feature?.properties?.ADMIN)}.png`
          }
          style={{ height: "25px", marginRight: "5px" }}
        />
        <div
          className="countryNameBox"
          style={{ cursor: "pointer", fontSize: "30px" }}
        >
          {feature?.properties?.ADMIN}
        </div>
      </div>
      {productionData && productionData?.length > 0 && (
        <Fragment>
          <div style={{ marginTop: "20px", fontWeight: 600 }}>
            Production By Year In {productionData[0].metric}:
          </div>
          <ResourcePlot data={productionData} />
        </Fragment>
      )}
      {reserveData && reserveData?.length > 0 && (
        <Fragment>
          <div style={{ marginTop: "20px", fontWeight: 600 }}>
            Reserves By Year In {reserveData[0].metric}:
          </div>
          <ResourcePlot data={reserveData} />
        </Fragment>
      )}
      {/* <div style={{ marginTop: "20px" }}>Net Import/Export Balance:</div>
      <div style={{ marginTop: "20px" }}>Share Of Total Exports:</div>
      <div style={{ marginTop: "20px" }}>Share Of Resource Exports:</div>
      <div style={{ marginTop: "20px" }}>
        Correlation between Price/Production and GDP:
      </div> */}
      <button
        style={{
          ...COUNTRY_STYLE.BUTTON,
          background: BASE_STYLE.COLOR_PALLETE.BACKGROUND,
          color: BASE_STYLE.COLOR_PALLETE.TEXT,
        }}
        onClick={() => setDialogIsOpen(true)}
      >
        Open Country Information
      </button>
    </div>
  );
};

export default CountryResourcePopup;
