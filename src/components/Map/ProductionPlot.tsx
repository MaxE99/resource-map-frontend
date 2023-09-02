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
      mode: "lines+markers",
      marker: { color: "blue" },
      line: { shape: "linear" },
    },
  ];

  const layout = {
    xaxis: {
      title: "Year",
    },
    yaxis: {
      title: data.length ? `Amount in ${data[0].metric}` : "Placeholder",
    },
  };

  return <Plot style={{ width: "100%" }} data={plotData} layout={layout} />;
};

export default ProductionPlot;
