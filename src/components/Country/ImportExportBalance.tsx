import Plot from "react-plotly.js";
import { CountryInformationT } from "../../types/country";
import { Fragment, useEffect, useState } from "react";
import { fetchImportExportBalanceData } from "../../functions/api";
import { ImportExportBalanceT } from "../../types/api";

const ImportExportBalance = ({ country }: CountryInformationT): JSX.Element => {
  const [importExportBalance, setImportExportBalance] = useState<
    ImportExportBalanceT[]
  >([]);
  useEffect(() => {
    if (country.properties?.ADMIN) {
      fetchImportExportBalanceData(country.properties.ADMIN)
        .then((data: ImportExportBalanceT[]) => setImportExportBalance(data))
        .catch(() =>
          console.error("Could not fetch import export balance data!")
        );
    }
  }, []);

  const data: any = [
    {
      type: "scatter",
      mode: "lines",
      name: "Commodity Imports",
      x: importExportBalance.map((data) => data.year),
      y: importExportBalance.map((data) => data.total_commodity_imports),
      showlegend: false,
      line: { color: "red" },
    },
    {
      type: "scatter",
      mode: "lines",
      name: "Exports",
      x: importExportBalance.map((data) => data.year),
      y: importExportBalance.map((data) => data.total_commodity_exports),
      showlegend: false,
      line: { color: "green" },
    },
    {
      type: "bar",
      name: "Balance",
      x: importExportBalance.map((data) => data.year),
      y: importExportBalance.map(
        (data) => data.total_commodity_exports - data.total_commodity_imports
      ),
      showlegend: false,
    },
  ];

  const layout = {
    margin: { t: 10, r: 20, b: 35, l: 25 },
  };

  const config = {
    displayModeBar: false,
  };

  return (
    <Fragment>
      <div
        style={{
          fontSize: "20px",
          fontWeight: 600,
          marginTop: "20px",
        }}
      >
        Commodity Trade Balance
      </div>
      <Plot
        style={{ width: "100%" }}
        data={data}
        layout={layout}
        config={config}
      />
    </Fragment>
  );
};

export default ImportExportBalance;
