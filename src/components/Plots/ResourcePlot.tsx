import Plot from "react-plotly.js";
import { Data } from "plotly.js";

import { ProductionReservesT } from "../../utils/types/api";
import { BASE_STYLE } from "../../utils/styles/base";
import { useState } from "react";
import { ResourcePlotT } from "./types";

const ResourcePlot = ({ data }: ResourcePlotT): JSX.Element => {
  const [hoverInfoText, setHoverInfoText] = useState<string>("");
  const dates: number[] = data.map((entry: ProductionReservesT) => entry.year);
  const amounts: string[] = data.map(
    (entry: ProductionReservesT) => entry.amount,
  );

  const plotData: Data[] = [
    {
      x: dates,
      y: amounts,
      type: "bar",
      fill: "tozeroy",
      mode: "lines",
      line: { color: BASE_STYLE.COLOR_PALLETE.ELEMENTS },
      hoverinfo: "none",
      marker: {
        line: {
          color: BASE_STYLE.COLOR_PALLETE.LIGHT_GREY,
          width: 1,
        },
      },
    },
  ];

  const layout = {
    xaxis: {
      showgrid: false,
      ticklen: 5,
      dtick: 1,
      tickfont: {
        color: BASE_STYLE.COLOR_PALLETE.TEXT,
      },
    },
    yaxis: {
      ticklen: 5,
      tickfont: {
        color: BASE_STYLE.COLOR_PALLETE.TEXT,
      },
    },
    plot_bgcolor: BASE_STYLE.COLOR_PALLETE.BACKGROUND,
    paper_bgcolor: BASE_STYLE.COLOR_PALLETE.BACKGROUND,
    margin: { t: 10, r: 5, b: 25, l: 35 },
  };

  const handleHover = (event: any) => {
    const points = event.points;
    if (points.length > 0) {
      const infotext = points.map((point: any) => {
        return `${point.x}: ${point.y.toFixed(2)}`;
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
        style={{
          width: "400px",
          height: "300px",
        }}
        data={plotData}
        layout={layout}
        config={{ displayModeBar: false, responsive: true }}
        onHover={handleHover}
        onUnhover={handleUnhover}
      />
      {hoverInfoText && (
        <div
          className="hoverInfoText"
          dangerouslySetInnerHTML={{ __html: hoverInfoText }}
        ></div>
      )}
    </div>
  );
};

export default ResourcePlot;
