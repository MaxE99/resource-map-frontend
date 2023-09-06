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
      mode: "lines",
      line: { color: BASE_STYLE.COLOR_PALLETE.BACKGROUND },
    },
  ];

  const layout = {
    xaxis: {
      title: "Year",
      showgrid: false,
    },
    yaxis: {
      title: data[0].metric,
    },
    margin: { t: 20, r: 60, b: 40, l: 40 },
  };

  return <Plot style={{ width: "100%" }} data={plotData} layout={layout} />;
};

export default ResourcePlot;
