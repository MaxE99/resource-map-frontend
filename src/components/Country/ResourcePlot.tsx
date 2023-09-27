import Plot from "react-plotly.js";
import { Data } from "plotly.js";

import { ProductionReservesT } from "../../types/api";
import { BASE_STYLE } from "../../styles/base";
import { ResourcePlotT } from "../../types/map";
import { useState } from "react";

const ResourcePlot = ({ data }: ResourcePlotT): JSX.Element => {
  const [hoverInfoText, setHoverInfoText] = useState<string>("");
  const dates: number[] = data.map((entry: ProductionReservesT) => entry.year);
  const amounts: string[] = data.map(
    (entry: ProductionReservesT) => entry.amount
  );

  const plotData: Data[] = [
    {
      x: dates,
      y: amounts,
      type: "scatter",
      fill: "tozeroy",
      mode: "lines",
      line: { color: BASE_STYLE.COLOR_PALLETE.ELEMENTS },
      hoverinfo: "none",
    },
  ];

  const layout = {
    xaxis: {
      showgrid: false,
      ticklen: 5,
      dtick: 1,
    },
    yaxis: {
      ticklen: 5,
    },
    margin: { t: 10, r: 15, b: 25, l: 35 },
  };

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  const handleHover = (event: any) => {
    const points = event.points;
    if (points.length > 0) {
      const infotext = points.map((point: any) => {
        return `${point.x}: $ ${point.y.toFixed(2)}`;
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
        config={config}
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
