import { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import Sidebar from "./components/Sidebar/Sidebar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { API } from "./config";

const App = (): JSX.Element => {
  const [selectedCommodity, setSelectedCommodity] = useState<any>();
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const [commodities, setCommodities] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);

  useEffect(() => {
    fetch(API.COMMODITIES, {
      method: "GET", // Specify the GET method
    })
      .then((response) => response.json())
      .then((data) => setCommodities(data));

    fetch(API.COUNTRIES, {
      method: "GET", // Specify the GET method
    })
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "70%", display: "block", padding: "100px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "30px",
          }}
        >
          <Autocomplete
            sx={{ width: "47.5%", background: "var(--main-text)" }}
            value={selectedCommodity}
            onChange={(_event, newValue) => {
              setSelectedCommodity(newValue);
            }}
            options={commodities
              .map((obj: any) => obj.name)
              .sort((a: string, b: string) => a.localeCompare(b))}
            renderInput={(params) => (
              <TextField {...params} label="Select a commodity" />
            )}
          />
          <Autocomplete
            sx={{ width: "47.5%", background: "var(--main-text)" }}
            value={selectedCountry}
            onChange={(_event, newValue) => {
              setSelectedCountry(newValue);
            }}
            options={countries.map((obj: any) => obj.name)}
            renderInput={(params) => (
              <TextField {...params} label="Select a country" />
            )}
          />
        </div>

        <Map />
      </div>

      <Sidebar />
    </div>
  );
};

export default App;
