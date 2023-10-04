import Plot from "react-plotly.js";
import { Fragment, useEffect, useState } from "react";
import { ImportExportBalanceT } from "../../utils/types/api";
import NoDataChip from "../NoDataChip/NoDataChip";
import { fetchImportExportBalanceData } from "../../utils/functions/api";
import { TradeBalancePlotT } from "./types";
import { Data } from "plotly.js";
import CountryToggleGroup from "../Country/CountryToggleGroup";

const TradeBalancePlot = ({
  feature,
  setIsBalanceLoaded,
}: TradeBalancePlotT): JSX.Element => {
  const [currentChoice, setCurrentChoice] = useState<string>("Commodity");
  const [importExportBalance, setImportExportBalance] = useState<
    ImportExportBalanceT[]
  >([]);

  useEffect(() => {
    if (feature.properties?.ADMIN) {
      fetchImportExportBalanceData(undefined, feature.properties.ADMIN)
        .then((data: ImportExportBalanceT[]) => setImportExportBalance(data))
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setIsBalanceLoaded(true));
    }
  }, []);

  const data: Data[] = [
    {
      type: "scatter",
      mode: "lines",
      name: "Commodity Imports",
      x: importExportBalance.map((data) => data.year),
      y:
        currentChoice === "Commodity"
          ? importExportBalance.map((data) => data.total_commodity_imports)
          : importExportBalance.map((data) => data.total_imports),
      showlegend: false,
      line: { color: "red" },
    },
    {
      type: "scatter",
      mode: "lines",
      name: "Exports",
      x: importExportBalance.map((data) => data.year),
      y:
        currentChoice === "Commodity"
          ? importExportBalance.map((data) => data.total_commodity_exports)
          : importExportBalance.map((data) => data.total_exports),
      showlegend: false,
      line: { color: "green" },
    },
    {
      type: "bar",
      name: "Balance",
      x: importExportBalance.map((data) => data.year),
      y:
        currentChoice === "Commodity"
          ? importExportBalance.map(
              (data) =>
                data.total_commodity_exports - data.total_commodity_imports
            )
          : importExportBalance.map(
              (data) => data.total_exports - data.total_imports
            ),
      showlegend: false,
      marker: {
        color: importExportBalance.map((data) => {
          const balance =
            currentChoice === "Commodity"
              ? data.total_commodity_exports - data.total_commodity_imports
              : data.total_exports - data.total_imports;
          return balance >= 0 ? "green" : "red"; // Set color to green for positive, red for negative
        }),
      },
    },
  ];

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          zIndex: 1,
          margin: "20px 0 10px",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: 600,
            position: "absolute",
            bottom: 0,
          }}
        >
          {currentChoice} Trade Balance
        </div>
        <CountryToggleGroup
          firstChoice="Commodity"
          secondChoice="Total"
          currentChoice={currentChoice}
          setCurrentChoice={setCurrentChoice}
        />
      </div>
      {importExportBalance.length ? (
        <Plot
          style={{ width: "100%" }}
          data={data}
          layout={{ margin: { t: 10, r: 20, b: 35, l: 30 } }}
          config={{ displayModeBar: false, responsive: true }}
        />
      ) : (
        <NoDataChip label={currentChoice} />
      )}
    </Fragment>
  );
};

export default TradeBalancePlot;
