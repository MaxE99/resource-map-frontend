import Plot from "react-plotly.js";

const PricePlot = ({ data }: any) => {
  const dates = data.map((entry: any) => entry.date);
  const prices = data.map((entry: any) => parseFloat(entry.price));

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
    title: "Price Trend Over Time",
    xaxis: {
      title: "Date",
    },
    yaxis: {
      title: "Price",
    },
  };

  return <Plot style={{ width: "100%" }} data={plotData} layout={layout} />;
};

export default PricePlot;
