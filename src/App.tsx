import { useEffect, useState } from "react";
import Map from "./components/Map/Map";
import Sidebar from "./components/Sidebar/Sidebar";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import { API } from "./config";

const App = (): JSX.Element => {
  const [selectedCommodity, setSelectedCommodity] = useState<any>();
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const [commodities, setCommodities] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [year, setYear] = useState<number>(2018);
  const [geojson, setGeojson] = useState<any>();

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
      .then((data) => {
        setCountries(data);
        const filteredArray = data.filter((obj: any) => obj.geojson !== null);
        const features = filteredArray.map((obj: any) => obj.geojson);
        const featureCollection = {
          type: "FeatureCollection",
          features: features,
        };
        setGeojson(featureCollection);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setYear(newValue);
  };

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
        {geojson && <Map countries={geojson} />}
        <Slider
          sx={{ marginTop: "40px" }}
          value={year}
          min={2018}
          max={2022}
          step={1}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => value.toString()}
          aria-label="Year Slider"
        />
      </div>

      <Sidebar
        commodity={commodities.find(
          (commodity: any) => commodity.name === selectedCommodity
        )}
      />
    </div>
  );
};

export default App;
