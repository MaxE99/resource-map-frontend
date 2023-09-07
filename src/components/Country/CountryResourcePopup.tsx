import { useContext, useEffect, useState, Fragment } from "react";

import ResourcePlot from "./ResourcePlot";
import { AppContext } from "../AppContextProvider";
import { CountryResourcePopupT } from "../../types/country";
import { ProductionReservesT } from "../../types/api";
import { COUNTRY_STYLE } from "../../styles/country";
import { BASE_STYLE } from "../../styles/base";
import { fetchProductionData, fetchReservesData } from "../../functions/api";

const CountryResourcePopup = ({
  feature,
  commodity,
}: CountryResourcePopupT): JSX.Element => {
  const [productionData, setProductionData] = useState<ProductionReservesT[]>();
  const [reserveData, setReserveData] = useState<ProductionReservesT[]>();
  const { setDialogIsOpen } = useContext<any>(AppContext);

  useEffect(() => {
    if (feature?.properties) {
      fetchProductionData(undefined, commodity.name, feature.properties.ADMIN)
        .then((data: ProductionReservesT[]) => setProductionData(data))
        .catch((error) =>
          console.error("Error fetching production data:", error)
        );

      fetchReservesData(undefined, commodity.name, feature.properties.ADMIN)
        .then((data: ProductionReservesT[]) => setReserveData(data))
        .catch((error) =>
          console.error("Error fetching reserves data:", error)
        );
    }
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <span>Country: </span>
        <button
          style={{ cursor: "pointer", background: "none", fontSize: "16px" }}
          onMouseOver={(e: any) =>
            (e.target.style.textDecoration = "underline")
          }
          onMouseOut={(e: any) => (e.target.style.textDecoration = "none")}
          onClick={() => setDialogIsOpen(true)}
        >
          {feature?.properties?.ADMIN}
        </button>
      </div>
      {productionData && productionData?.length > 0 && (
        <Fragment>
          <div style={{ marginTop: "20px" }}>Production By Year:</div>
          <ResourcePlot data={productionData} />
        </Fragment>
      )}
      {reserveData && reserveData?.length > 0 && (
        <Fragment>
          <div style={{ marginTop: "20px" }}>Reserves By Year:</div>
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
