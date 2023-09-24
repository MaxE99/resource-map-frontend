import Plot from "react-plotly.js";
import { CountryInformationT } from "../../types/country";
import { Fragment, useContext, useEffect, useState } from "react";
import { fetchImportExportBalanceData } from "../../functions/api";
import { ImportExportBalanceT } from "../../types/api";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { AppContext } from "../AppContextProvider";
import NoDataChip from "../NoDataChip/NoDataChip";

const ImportExportBalance = ({ country }: CountryInformationT): JSX.Element => {
  const [totalOrCommodityBalance, setTotalOrCommodityBalance] = useState<
    "Commodity Trade Balance" | "Total Trade Balance"
  >("Commodity Trade Balance");
  const [importExportBalance, setImportExportBalance] = useState<
    ImportExportBalanceT[]
  >([]);
  const { setIsLoading } = useContext<any>(AppContext);

  useEffect(() => {
    if (country.properties?.ADMIN) {
      setIsLoading(true);
      fetchImportExportBalanceData(country.properties.ADMIN)
        .then((data: ImportExportBalanceT[]) => setImportExportBalance(data))
        .catch(() =>
          console.error("Could not fetch import export balance data!")
        )
        .finally(() => setIsLoading(false));
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
            Commodity Trade Balance
          </ToggleButton>
          <ToggleButton
            sx={{ fontSize: "12px", padding: "8px 12px", fontWeight: 600 }}
            value="Total Trade Balance"
          >
            Total Trade Balance
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
