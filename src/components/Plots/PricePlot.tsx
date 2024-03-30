import { useEffect, useState } from "react";
import { Data } from "plotly.js";
import Plot from "react-plotly.js";

import { PricePlotProps } from "./types";
import NoDataChip from "../NoDataChip/NoDataChip";
import { PriceT } from "../../utils/types/api";

const PricePlot = ({ data }: PricePlotProps): JSX.Element => {
  const [hoverInfoText, setHoverInfoText] = useState<string>("");
  const [key, setKey] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const dates: string[] = data
    ? data
        .sort(
          (a: PriceT, b: PriceT) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .map((entry: PriceT) => entry.date)
    : [];
  const prices: number[] = data
    ? data
        .sort(
          (a: PriceT, b: PriceT) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .map((entry: PriceT) => Number(entry.price))
    : [];

  const plotData: Data[] = [
    {
      x: dates,
      y: prices,
      type: "scatter",
      fill: "tozeroy",
      mode: "lines",
      line: { color: "#1277c4" },
      hoverinfo: "none",
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

  const handleHover = (event: any) => {
    const points = event.points;
    if (points.length > 0) {
      const infotext = points.map((point: any) => {
        return `${JSON.stringify(point.x).substring(1, 8)}: $ ${point.y.toFixed(
          2
        )}`;
      });
      setHoverInfoText(infotext.join("<br/>"));
    } else {
      setHoverInfoText("");
    }
  };

  const handleUnhover = (): void => {
    setHoverInfoText("");
  };

  return (
    <div className="plotWrapper">
      <Plot
        key={key}
        style={{ width: "100%" }}
        data={plotData}
        layout={data && data.length ? layout : emptyLayout}
        config={data && data.length ? config : emptyConfig}
        onHover={handleHover}
        onUnhover={handleUnhover}
      />
      {!data ||
        (data.length < 1 && (
          <div style={{ position: "absolute" }}>
            <NoDataChip label="price" />
          </div>
        ))}
      {hoverInfoText && (
        <div
          className="hoverInfoText"
          dangerouslySetInnerHTML={{ __html: hoverInfoText }}
        ></div>
      )}
    </div>
  );
};

export default PricePlot;
