import { useEffect, useState } from "react";
import { API } from "../../config";
import ProductionPlot from "./ProductionPlot";

const CountryResourcePopup = ({ feature, commodity }: any): JSX.Element => {
  const [productionData, setProductionData] = useState<any>();
  const [reserveData, setReserveData] = useState<any>();

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
    <div
      style={{
        width: "600px !important",
        fontSize: "16px",
        overflowY: "auto",
        height: "300px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        Country: {feature.properties.ADMIN}
      </div>
      {feature.properties.amount && (
        <div style={{ marginTop: "20px" }}>
          Amount: {feature.properties.amount}
        </div>
      )}
      <div style={{ marginTop: "20px" }}>Production By Year:</div>
      {productionData && <ProductionPlot data={productionData} />}
      <div style={{ marginTop: "20px" }}>Reserves By Year:</div>
      {reserveData && <ProductionPlot data={reserveData} />}
      <div style={{ marginTop: "20px" }}>Net Import/Export Balance:</div>
      <div style={{ marginTop: "20px" }}>Share Of Total Exports:</div>
      <div style={{ marginTop: "20px" }}>Share Of Resource Exports:</div>
      <div style={{ marginTop: "20px" }}>
        Correlation between Price/Production and GDP:
      </div>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "black",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Open Country Information
      </button>
    </div>
  );
};

export default CountryResourcePopup;
