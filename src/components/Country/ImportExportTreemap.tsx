// https://plotly.com/javascript/reference/treemap/#treemap-texttemplate

import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { ImportExportTreemapT } from "../../types/country";
import { APP_STYLE } from "../../styles/app";
import { fetchExportData, fetchImportData } from "../../functions/api";
import { ImportExportT } from "../../types/api";
import Plot from "react-plotly.js";
import { IMPORT_EXPORT_MARKS } from "../../config";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import NoDataChip from "../NoDataChip/NoDataChip";

const ImportExportTreemap = ({
  country,
  setIsImportExportLoaded,
}: ImportExportTreemapT): JSX.Element => {
  const [importOrExport, setImportOrExport] = useState<"import" | "export">(
    "export"
  );
  const [year, setYear] = useState<number>(2021);
  const [importExportData, setImportExportData] = useState<ImportExportT[]>([]);

  useEffect(() => {
    setIsImportExportLoaded(false);
    const fetchData = async () => {
      try {
        const data = await (importOrExport === "import"
          ? fetchImportData(year, undefined, country.properties?.ADMIN)
          : fetchExportData(year, undefined, country.properties?.ADMIN));

        const filteredData = data
          .filter((d) => !isNaN(Number(d.amount)) && Number(d.amount) !== 0)
          .sort((a, b) => a.commodity_name.localeCompare(b.commodity_name));

        setImportExportData(filteredData);
      } catch (error) {
        console.error("Import/Export data could not be fetched!");
      } finally {
        setIsImportExportLoaded(true);
      }
    };
    fetchData();
  }, [year, importOrExport]);

  const handleYearChange = (_: any, newValue: any) => {
    setYear(newValue);
  };

  const handleImportExportChange = (
    _: React.MouseEvent<HTMLElement>,
    newSelection: "import" | "export"
  ) => {
    setImportOrExport(newSelection);
  };

  const data: any = [
    {
      labels: importExportData.map((data) => data.commodity_name),
      parents: importExportData.map(() => ""), // Set a common parent for all items
      values: importExportData.map((data) => Number(data.amount)),
      type: "treemap",
      textinfo: "label",
      textposition: "middle center",
      hovertemplate: "<b>%{label}</b><br>$ %{value}<br>",
      name: "",
      textfont: { size: 20, color: "#FFFFFF" },
      marker: {
        line: { width: 1, color: "black" },
      },
    },
  ];

  const config = {
    displayModeBar: false,
    responsive: true,
  };

  return (
    <div style={{ width: "100%" }}>
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
          <span>{year}</span>
          <span style={{ textTransform: "uppercase", marginLeft: "4px" }}>
            Commodity
          </span>
          <span style={{ textTransform: "uppercase", marginLeft: "4px" }}>
            {importOrExport}
          </span>
        </div>
        <ToggleButtonGroup
          color="secondary"
          value={importOrExport}
          exclusive
          onChange={handleImportExportChange}
          sx={{ marginLeft: "auto" }}
        >
          <ToggleButton
            sx={{ fontSize: "12px", padding: "8px 12px", fontWeight: 600 }}
            value="import"
          >
            Import
          </ToggleButton>
          <ToggleButton
            sx={{ fontSize: "12px", padding: "8px 12px", fontWeight: 600 }}
            value="export"
          >
            Export
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {importExportData.length ? (
        <Plot
          style={{ marginTop: "-35px", marginLeft: "-10px" }}
          data={data}
          layout={{
            width: 780,
            height: 780,
            margin: {
              l: 0,
              r: 0,
              t: 0,
              b: 0,
            },
          }}
          config={config}
        />
      ) : (
        <NoDataChip label={importOrExport} />
      )}

      <Slider
        color="secondary"
        sx={{
          ...APP_STYLE,
          width: "97.5%",
          margin: "5px 10px 20px",
          height: "10px",
        }}
        value={year}
        min={1995}
        max={2021}
        marks={IMPORT_EXPORT_MARKS}
        step={1}
        onChange={handleYearChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => value.toString()}
        aria-label="Year Slider"
      />
    </div>
  );
};

export default ImportExportTreemap;
