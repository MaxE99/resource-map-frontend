import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";

const headers = [
  "Resource",
  "Production",
  "Reserves",
  "Import",
  "Export",
  "% of Exports",
];

const data = [
  {
    Resource: "Resource 1",
    Production: 1000,
    Reserves: 500,
    Import: 200,
    Export: 300,
    PercentageOfExports: 30,
  },
  {
    Resource: "Resource 2",
    Production: 1500,
    Reserves: 800,
    Import: 250,
    Export: 400,
    PercentageOfExports: 40,
  },
  // Add more data rows as needed
];

const ResourceTable = () => {
  const [year, setYear] = useState(2023); // Initial year

  const handleYearChange = (_: any, newValue: any) => {
    setYear(newValue);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.Resource}</TableCell>
                <TableCell>{row.Production}</TableCell>
                <TableCell>{row.Reserves}</TableCell>
                <TableCell>{row.Import}</TableCell>
                <TableCell>{row.Export}</TableCell>
                <TableCell>{row.PercentageOfExports}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Slider
        value={year}
        min={2000}
        max={2030}
        onChange={handleYearChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `Year: ${value}`}
      />
    </div>
  );
};

export default ResourceTable;
