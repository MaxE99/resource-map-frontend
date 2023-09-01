import Plot from "react-plotly.js";

const PricePlot = ({ data }: any) => {
  console.log(data);
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
    title: data[0].description,
    xaxis: {
      title: "Date",
    },
    yaxis: {
      title: "Price in $",
    },
  };

  return <Plot style={{ width: "100%" }} data={plotData} layout={layout} />;
};

export default PricePlot;
