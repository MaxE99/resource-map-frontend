import Plot from "react-plotly.js";
import { Data } from "plotly.js";

import { ProductionReservesT } from "../../types/api";
import { BASE_STYLE } from "../../styles/base";
import { ResourcePlotT } from "../../types/map";

const ResourcePlot = ({ data }: ResourcePlotT): JSX.Element => {
  const dates: number[] = data.map((entry: ProductionReservesT) => entry.year);
  const amounts: number[] = data.map(
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
    },
  ];

  const layout = {
    xaxis: {
      showgrid: false,
      ticklen: 15,
      dtick: 1,
    },
    yaxis: {
      ticklen: 15,
    },
    margin: { t: 0, r: 60, b: 35, l: 55 },
  };

  const config = {
    displayModeBar: false,
  };

  return (
    <Plot
      style={{
        width: "400px",
        height: "300px",
      }}
      data={plotData}
      layout={layout}
      config={config}
    />
  );
};

export default ResourcePlot;
