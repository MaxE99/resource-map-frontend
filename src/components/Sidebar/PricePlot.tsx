import Plot from "react-plotly.js";

const PricePlot = ({ data }: any) => {
  const dates = data.map((entry: any) => entry.date);
  const prices = data.map((entry: any) => parseFloat(entry.price));

  const plotData = [
    {
      x: dates,
      y: prices,
      type: "scatter",
      mode: "lines",
      line: { color: "white" },
    },
  ];

  const layout = {
    xaxis: {
      tickfont: { color: "white" },
      showgrid: false,
    },
    yaxis: {
      tickfont: { color: "white" },
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
