import Plot from "react-plotly.js";

const ProductionPlot = ({ data }: any) => {
  console.log(data);
  const dates = data?.map((entry: any) => entry.year);
  const prices = data?.map((entry: any) => parseFloat(entry.amount));

  const plotData = [
    {
      x: dates,
      y: prices,
      type: "scatter",
      mode: "lines",
      line: { color: "black" },
    },
  ];

  const layout = {
    xaxis: {
      title: "Year",
      showgrid: false,
    },
    yaxis: {
      title: data.length ? `Amount in ${data[0].metric}` : "Placeholder",
    },
    margin: { t: 20, r: 60, b: 40, l: 40 },
  };

  return <Plot style={{ width: "100%" }} data={plotData} layout={layout} />;
};

export default ProductionPlot;
