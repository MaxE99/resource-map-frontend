import { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import { ResourceTableT } from "./types";
import { MARKS } from "../../utils/config";
import { ProductionReservesT } from "../../utils/types/api";
import NoDataChip from "../NoDataChip/NoDataChip";
import {
  fetchProductionData,
  fetchReservesData,
} from "../../utils/functions/api";
import CountryToggleGroup from "./CountryToggleGroup";

const HEADERS = ["Resource", "Amount", "Share", "Rank"];

const ResourceTable = ({
  feature,
  isProductionReservesLoaded,
  setIsProductionReservesLoaded,
}: ResourceTableT): JSX.Element => {
  const [year, setYear] = useState<number>(2021);
  const [prodReserveData, setProdReserveData] = useState<ProductionReservesT[]>(
    []
  );
  const [productionOrReserves, setProductionOrReserves] =
    useState<string>("production");

  useEffect(() => {
    setIsProductionReservesLoaded(false);
    const fetchData = async () => {
      try {
        const data = await (productionOrReserves === "production"
          ? fetchProductionData(year, undefined, feature.properties?.ADMIN)
          : fetchReservesData(year, undefined, feature.properties?.ADMIN));

        const filteredData = data
          .filter((d) => !isNaN(Number(d.amount)) && Number(d.amount) !== 0)
          .sort((a, b) => a.commodity_name.localeCompare(b.commodity_name));
        setProdReserveData(filteredData);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsProductionReservesLoaded(true);
      }
    };
    fetchData();
  }, [year, productionOrReserves]);

  const handleYearChange = (_: any, newValue: any) => {
    setYear(newValue);
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
            {productionOrReserves}
          </span>
        </div>
        <CountryToggleGroup
          firstChoice="production"
          secondChoice="reserves"
          currentChoice={productionOrReserves}
          setCurrentChoice={setProductionOrReserves}
        />
      </div>
      {prodReserveData.length ? (
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", border: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {HEADERS.map((header) => (
                  <TableCell sx={{ textAlign: "center" }} key={header}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {prodReserveData.map((row, index) => (
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
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontWeight: row.rank && row.rank <= 3 ? 600 : "normal",
                      backgroundColor:
                        row.rank === 1
                          ? "gold"
                          : row.rank === 2
                          ? "silver"
                          : row.rank === 3
                          ? "#CD7F32"
                          : "transparent",
                    }}
                  >
                    {row.rank}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : isProductionReservesLoaded ? (
        <NoDataChip label={productionOrReserves} />
      ) : (
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", border: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Table>
            <TableBody>
              {new Array(6).fill(null).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={4} sx={{ height: 48 }}>
                    {/* Empty cell */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Slider
        color="secondary"
        sx={{
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
