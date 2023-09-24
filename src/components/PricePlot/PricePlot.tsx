import { useEffect, useState } from "react";
import { CommodityPriceT } from "../../types/api";
import { PricePlotProps } from "./types";
import { Data } from "plotly.js";
import Plot from "react-plotly.js";
import NoDataChip from "../NoDataChip/NoDataChip";

const PricePlot = ({ data }: PricePlotProps): JSX.Element => {
  const [key, setKey] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const dates: string[] = data
    ? data.map((entry: CommodityPriceT) => entry.date)
    : [];
  const prices: number[] = data
    ? data.map((entry: CommodityPriceT) => entry.price)
    : [];

  const plotData: Data[] = [
    {
      x: dates,
      y: prices,
      type: "scatter",
      fill: "tozeroy",
      mode: "lines",
      line: { color: "#1277c4" },
    },
  ];

  const layout = {
    xaxis: {
      tickfont: { color: "#fff" },
      ticklen: 15,
      showgrid: false,
    },
    yaxis: {
      tickfont: { color: "#fff" },
      ticklen: 15,
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { t: 0, r: 20, b: 35, l: 55 },
  };

  const emptyLayout = {
    xaxis: {
      tickfont: { color: "#fff" },
      ticklen: 15,
      showgrid: false,
      range: [1995, 2023],
    },
    yaxis: {
      tickfont: { color: "#fff" },
      ticklen: 15,
      range: [0, 3600],
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { t: 0, r: 20, b: 35, l: 55 },
  };

  const config = {
    displayModeBar: false,
  };

  const emptyConfig = {
    displayModeBar: false,
    responsive: false,
    staticPlot: true,
  };

  const forceRerender = (): void => {
    setKey(key + 1);
  };

  const handleResize = (): void => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    forceRerender();
  }, [windowWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Plot
        key={key}
        style={{ width: "100%" }}
        data={plotData}
        layout={data && data.length ? layout : emptyLayout}
        config={data && data.length ? config : emptyConfig}
      />
      {!data ||
        (data.length < 1 && (
          <div style={{ position: "absolute" }}>
            <NoDataChip label="price" />
          </div>
        ))}
    </div>
  );
};

export default PricePlot;
