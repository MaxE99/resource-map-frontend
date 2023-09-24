import { Fragment, useContext, useEffect, useState } from "react";
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
import { fetchProductionData, fetchReservesData } from "../../functions/api";
import { ProductionReservesT } from "../../types/api";
import { AppContext } from "../AppContextProvider";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const headers = ["Resource", "Amount", "Share", "Rank"];

const ResourceTable = ({ country }: CountryInformationT): JSX.Element => {
  const [year, setYear] = useState<number>(2021);
  const [countryProductionData, setCountryProductionData] = useState<
    ProductionReservesT[]
  >([]);
  const [dataType, setDataType] = useState<"production" | "reserves">(
    "production"
  );
  const { setIsLoading } = useContext<any>(AppContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const data = await (dataType === "production"
          ? fetchProductionData(year, undefined, country.properties?.ADMIN)
          : fetchReservesData(year, undefined, country.properties?.ADMIN));

        const filteredData = data
          .filter((d) => !isNaN(Number(d.amount)) && Number(d.amount) !== 0)
          .sort((a, b) => a.commodity_name.localeCompare(b.commodity_name));
        setCountryProductionData(filteredData);
      } catch (error) {
        console.error("Production could not be fetched!", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [year, dataType]);

  const handleYearChange = (_: any, newValue: any) => {
    setYear(newValue);
  };

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newDataType: "production" | "reserves"
  ) => {
    setDataType(newDataType);
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          position: "relative",
          marginBottom: "10px",
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
            {dataType}
          </span>
        </div>
        <ToggleButtonGroup
          color="secondary"
          value={dataType}
          exclusive
          onChange={handleChange}
          sx={{ marginLeft: "auto" }}
        >
          <ToggleButton
            sx={{ fontSize: "12px", padding: "8px 12px", fontWeight: 600 }}
            value="production"
          >
            Production
          </ToggleButton>
          <ToggleButton
            sx={{ fontSize: "12px", padding: "8px 12px", fontWeight: 600 }}
            value="reserves"
          >
            Reserves
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
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
                    ? Number(row.share).toFixed(2) + " %"
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
    </Fragment>
  );
};

export default ResourceTable;
