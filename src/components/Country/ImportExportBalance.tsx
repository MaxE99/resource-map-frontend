import Plot from "react-plotly.js";
import { Fragment, useEffect, useState } from "react";
import { fetchImportExportBalanceData } from "../../functions/api";
import { ImportExportBalanceT } from "../../types/api";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import NoDataChip from "../NoDataChip/NoDataChip";
import { ImportExportBalanceProps } from "../../types/country";

const ImportExportBalance = ({
  country,
  setIsBalanceLoaded,
}: ImportExportBalanceProps): JSX.Element => {
  const [totalOrCommodityBalance, setTotalOrCommodityBalance] = useState<
    "Commodity Trade Balance" | "Total Trade Balance"
  >("Commodity Trade Balance");
  const [importExportBalance, setImportExportBalance] = useState<
    ImportExportBalanceT[]
  >([]);

  useEffect(() => {
    if (country.properties?.ADMIN) {
      fetchImportExportBalanceData(undefined, country.properties.ADMIN)
        .then((data: ImportExportBalanceT[]) => setImportExportBalance(data))
        .catch(() =>
          console.error("Could not fetch import export balance data!")
        )
        .finally(() => setIsBalanceLoaded(true));
    }
  }, []);

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newSelection: "Commodity Trade Balance" | "Total Trade Balance"
  ) => {
    setTotalOrCommodityBalance(newSelection);
  };

  const data: any = [
    {
      type: "scatter",
      mode: "lines",
      name: "Commodity Imports",
      x: importExportBalance.map((data) => data.year),
      y:
        totalOrCommodityBalance === "Commodity Trade Balance"
          ? importExportBalance.map((data) => data.total_commodity_imports)
          : importExportBalance.map((data) => data.total_imports),
      showlegend: false,
      line: { color: "red" },
    },
    {
      type: "scatter",
      mode: "lines",
      name: "Exports",
      x: importExportBalance.map((data) => data.year),
      y:
        totalOrCommodityBalance === "Commodity Trade Balance"
          ? importExportBalance.map((data) => data.total_commodity_exports)
          : importExportBalance.map((data) => data.total_exports),
      showlegend: false,
      line: { color: "green" },
    },
    {
      type: "bar",
      name: "Balance",
      x: importExportBalance.map((data) => data.year),
      y:
        totalOrCommodityBalance === "Commodity Trade Balance"
          ? importExportBalance.map(
              (data) =>
                data.total_commodity_exports - data.total_commodity_imports
            )
          : importExportBalance.map(
              (data) => data.total_exports - data.total_imports
            ),
      showlegend: false,
      marker: {
        color: importExportBalance.map((data) => {
          const balance =
            totalOrCommodityBalance === "Commodity Trade Balance"
              ? data.total_commodity_exports - data.total_commodity_imports
              : data.total_exports - data.total_imports;
          return balance >= 0 ? "green" : "red"; // Set color to green for positive, red for negative
        }),
      },
    },
  ];

  const layout = {
    margin: { t: 10, r: 20, b: 35, l: 30 },
  };

  const config = {
    displayModeBar: false,
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          zIndex: 1,
          margin: "20px 0 10px",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: 600,
            position: "absolute",
            bottom: 0,
          }}
        >
          {totalOrCommodityBalance}
        </div>
        <ToggleButtonGroup
          color="secondary"
          value={totalOrCommodityBalance}
          exclusive
          onChange={handleChange}
          sx={{ marginLeft: "auto" }}
        >
          <ToggleButton
            sx={{ fontSize: "12px", padding: "8px 12px", fontWeight: 600 }}
            value="Commodity Trade Balance"
          >
            Commodity
          </ToggleButton>
          <ToggleButton
            sx={{ fontSize: "12px", padding: "8px 12px", fontWeight: 600 }}
            value="Total Trade Balance"
          >
            Total
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {importExportBalance.length ? (
        <Plot
          style={{ width: "100%" }}
          data={data}
          layout={layout}
          config={config}
        />
      ) : (
        <NoDataChip label={totalOrCommodityBalance} />
      )}
    </Fragment>
  );
};

export default ImportExportBalance;
