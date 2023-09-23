// https://plotly.com/javascript/reference/treemap/#treemap-texttemplate

import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { CountryInformationT } from "../../types/country";
import { APP_STYLE } from "../../styles/app";
import { fetchExportData } from "../../functions/api";
import { ImportExportT } from "../../types/api";
import Plot from "react-plotly.js";
import { IMPORT_EXPORT_MARKS } from "../../config";

const ImportExportTreemap = ({ country }: CountryInformationT): JSX.Element => {
  const [year, setYear] = useState<number>(2018);
  const [importExportData, setImportExportData] = useState<any[]>([]);

  useEffect(() => {
    fetchExportData(year, undefined, country.properties?.ADMIN)
      .then((data: ImportExportT[]) =>
        setImportExportData(
          data
            .filter((d) => !isNaN(Number(d.amount)) && Number(d.amount) !== 0)
            .sort((a, b) => a.commodity_name.localeCompare(b.commodity_name))
        )
      )
      .catch(() => console.error("Import/Export data could not be fetched!"));
  }, []);

  const handleYearChange = (_: any, newValue: any) => {
    setYear(newValue);
  };

  const data: any = [
    {
      labels: importExportData.map((data) => data.commodity_name),
      parents: importExportData.map(() => ""), // Set a common parent for all items
      values: importExportData.map((data) => Number(data.amount)),
      type: "treemap",
      textinfo: "label",
      textposition: "middle center",
      textfont: { size: 20, color: "#FFFFFF" },
      //   texttemplate: "%{labels}",
      outsidetextfont: { display: "none" },
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
