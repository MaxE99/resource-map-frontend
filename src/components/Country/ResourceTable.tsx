import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import { CountryInformationT } from "../../types/country";
import { MARKS } from "../../config";
import { APP_STYLE } from "../../styles/app";
import { fetchProductionData } from "../../functions/api";
import { ProductionReservesT } from "../../types/api";

const headers = ["Resource", "Amount", "Share", "Rank"];

const ResourceTable = ({ country }: CountryInformationT): JSX.Element => {
  const [year, setYear] = useState<number>(2018);
  const [countryProductionData, setCountryProductionData] = useState<
    ProductionReservesT[]
  >([]);

  useEffect(() => {
    fetchProductionData(year, undefined, country.properties?.ADMIN)
      .then((data: ProductionReservesT[]) =>
        setCountryProductionData(
          data
            .filter((d) => !isNaN(Number(d.amount)) && Number(d.amount) !== 0)
            .sort((a, b) => a.commodity_name.localeCompare(b.commodity_name))
        )
      )
      .catch(() => console.error("Production could not be fetched!"));
  }, []);

  const handleYearChange = (_: any, newValue: any) => {
    setYear(newValue);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", border: "1px solid rgba(224, 224, 224, 1)" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell sx={{ textAlign: "center" }} key={header}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {countryProductionData.map((row, index) => (
              <TableRow sx={{ textAlign: "center" }} key={index}>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.commodity_name}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {row.amount} {row.metric}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {!isNaN(Number(row.share)) && Number(row.share) !== 0
                    ? Number(row.share).toFixed(2)
                    : "/"}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.rank}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Slider
        color="secondary"
        sx={{
          ...APP_STYLE,
          width: "97.5%",
          margin: "5px 10px 20px",
          height: "10px",
        }}
        value={year}
        min={2018}
        max={2022}
        marks={MARKS}
        step={1}
        onChange={handleYearChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => value.toString()}
        aria-label="Year Slider"
      />
    </div>
  );
};

export default ResourceTable;
