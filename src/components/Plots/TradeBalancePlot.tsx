import { Fragment, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Data } from "plotly.js";

import { TradeBalanceResT, TradeBalanceT } from "../../utils/types/api";
import NoDataChip from "../NoDataChip/NoDataChip";
import { fetchCountryTradeBalanceData } from "../../utils/functions/api";
import { TradeBalancePlotT } from "./types";
import CountryToggleGroup from "../Country/CountryToggleGroup";
import { BASE_STYLE } from "../../utils/styles/base";

const TradeBalancePlot = ({
  feature,
  setIsBalanceLoaded,
  windowWidth,
}: TradeBalancePlotT): JSX.Element => {
  const [currentChoice, setCurrentChoice] = useState<string>("Commodity");
  const [plotIndex, setPlotIndex] = useState<number>(0);
  const [tradeBalance, setTradeBalance] = useState<TradeBalanceT[]>([]);

  useEffect(() => {
    feature.properties?.ADMIN &&
      fetchCountryTradeBalanceData(feature.properties.ADMIN)
        .then(({ data }: TradeBalanceResT) => setTradeBalance(data))
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => setIsBalanceLoaded(true));
  }, []);

  useEffect(() => {
    setPlotIndex(plotIndex + 1);
  }, [currentChoice]);

  const data: Data[] = [
    {
      type: "scatter",
      mode: "lines",
      name: "Commodity Imports",
      x: tradeBalance.map((data) => data.year),
      y:
        currentChoice === "Commodity"
          ? tradeBalance.map((data) => data.total_commodity_imports)
          : tradeBalance.map((data) => data.total_imports),
      showlegend: false,
      line: { color: BASE_STYLE.COLOR_PALLETE.RED },
    },
    {
      type: "scatter",
      mode: "lines",
      name: "Exports",
      x: tradeBalance.map((data) => data.year),
      y:
        currentChoice === "Commodity"
          ? tradeBalance.map((data) => data.total_commodity_exports)
          : tradeBalance.map((data) => data.total_exports),
      showlegend: false,
      line: { color: BASE_STYLE.COLOR_PALLETE.GREEN },
    },
    {
      type: "bar",
      name: "Balance",
      x: tradeBalance.map((data) => data.year),
      y:
        currentChoice === "Commodity"
          ? tradeBalance.map(
              (data: TradeBalanceT) =>
                Number(data.total_commodity_exports) -
                Number(data.total_commodity_imports)
            )
          : tradeBalance.map(
              (data) => Number(data.total_exports) - Number(data.total_imports)
            ),
      showlegend: false,
      marker: {
        color: tradeBalance.map((data: TradeBalanceT) => {
          const balance =
            currentChoice === "Commodity"
              ? Number(data.total_commodity_exports) -
                Number(data.total_commodity_imports)
              : Number(data.total_exports) - Number(data.total_imports);
          return balance >= 0
            ? BASE_STYLE.COLOR_PALLETE.GREEN
            : BASE_STYLE.COLOR_PALLETE.RED; // Set color to green for positive, red for negative
        }),
      },
    },
  ];

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          zIndex: 1,
          margin: "50px 0 10px",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: 600,
            position: "relative",
            display: "flex",
            alignItems: "center",
            bottom: 0,
            color: "var(--main-text)",
          }}
        >
          {windowWidth > 570 && (
            <div>
              <span style={{ textTransform: "uppercase", marginLeft: "4px" }}>
                {currentChoice}
              </span>
              <span style={{ textTransform: "uppercase", marginLeft: "4px" }}>
                Trade Balance
              </span>
            </div>
          )}
        </div>
        <CountryToggleGroup
          firstChoice="Commodity"
          secondChoice="Total"
          currentChoice={currentChoice}
          setCurrentChoice={setCurrentChoice}
        />
      </div>
      {tradeBalance.length ? (
        <div style={{ height: "500px" }}>
          <Plot
            style={{ width: "100%" }}
            data={data}
            key={plotIndex}
            layout={{
              margin: { t: 10, r: 20, b: 35, l: 30 },
              plot_bgcolor: BASE_STYLE.COLOR_PALLETE.BACKGROUND,
              paper_bgcolor: BASE_STYLE.COLOR_PALLETE.BACKGROUND,
              xaxis: {
                tickfont: {
                  color: BASE_STYLE.COLOR_PALLETE.TEXT,
                },
              },
              yaxis: {
                tickfont: {
                  color: BASE_STYLE.COLOR_PALLETE.TEXT,
                },
              },
            }}
            config={{ displayModeBar: false, responsive: true }}
          />
        </div>
      ) : (
        <NoDataChip label={currentChoice} />
      )}
    </Fragment>
  );
};

export default TradeBalancePlot;
