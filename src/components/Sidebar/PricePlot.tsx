import Plot from "react-plotly.js";
import { Data } from "plotly.js";

import { CommodityPriceT } from "../../types/api";
import { BASE_STYLE } from "../../styles/base";
import { PricePlotT } from "../../types/sidebar";

const PricePlot = ({ data }: PricePlotT) => {
  const dates: string[] = data.map((entry: CommodityPriceT) => entry.date);
  const prices: number[] = data.map((entry: CommodityPriceT) => entry.price);

  const plotData: Data[] = [
    {
      x: dates,
      y: prices,
      type: "scatter",
      fill: "tozeroy",
      mode: "lines",
      line: { color: BASE_STYLE.COLOR_PALLETE.TEXT },
    },
  ];

  const layout = {
    xaxis: {
      tickfont: { color: BASE_STYLE.COLOR_PALLETE.TEXT },
      showgrid: false,
    },
    yaxis: {
      tickfont: { color: BASE_STYLE.COLOR_PALLETE.TEXT },
    },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    margin: { t: 0, r: 20, b: 20, l: 40 },
  };

  const config = {
    displayModeBar: false,
  };

  return (
    <Plot
      style={{ width: "100%" }}
      data={plotData}
      layout={layout}
      config={config}
    />
  );
};

export default PricePlot;
