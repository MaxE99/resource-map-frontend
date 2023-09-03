import { useContext, useEffect, useState, Fragment } from "react";
import { API } from "../../config";
import ProductionPlot from "./ProductionPlot";
import { AppContext } from "../Sidebar/AppContextProvider";

const CountryResourcePopup = ({ feature, commodity }: any): JSX.Element => {
  const [productionData, setProductionData] = useState<any>();
  const [reserveData, setReserveData] = useState<any>();
  const { setSelectedCountry } = useContext<any>(AppContext);

  useEffect(() => {
    fetch(
      `${API.PRODUCTION}?country=${feature.properties.ADMIN}&commodity=${commodity.name}`,
      {
        method: "GET", // Specify the GET method
      }
    )
      .then((response) => response.json())
      .then((data) => setProductionData(data));

    fetch(
      `${API.RESERVES}?country=${feature.properties.ADMIN}&commodity=${commodity.name}`,
      {
        method: "GET", // Specify the GET method
      }
    )
      .then((response) => response.json())
      .then((data) => setReserveData(data));
  }, []);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        Country: {feature.properties.ADMIN}
      </div>
      {productionData && productionData.length > 0 && (
        <Fragment>
          <div style={{ marginTop: "20px" }}>Production By Year:</div>
          <ProductionPlot data={productionData} />
        </Fragment>
      )}
      {reserveData && reserveData.length > 0 && (
        <Fragment>
          <div style={{ marginTop: "20px" }}>Reserves By Year:</div>
          <ProductionPlot data={reserveData} />
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
          marginTop: "20px",
          padding: "10px 20px",
          background: "black",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          width: "calc(100% - 40px)",
          borderRadius: "4px",
        }}
        onClick={() => setSelectedCountry(feature.properties.ADMIN)}
      >
        Open Country Information
      </button>
    </div>
  );
};

export default CountryResourcePopup;
