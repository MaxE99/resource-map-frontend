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
  const [productionSwitch, setProductionSwitch] =
    useState<string>("Production");

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

  useEffect(() => {
    let queryString = "";
    if (productionSwitch === "Production") {
      queryString = `${API.PRODUCTION}?`;
    } else {
      queryString = `${API.RESERVES}?`;
    }

    if (selectedCountry) {
      queryString += `country=${selectedCountry}&`;
    }

    if (selectedCommodity) {
      queryString += `commodity=${selectedCommodity}&`;
    }

    if (year) {
      queryString += `year=${year}&`;
    }

    // Remove the trailing '&' if there's at least one parameter
    if (queryString.endsWith("&")) {
      queryString = queryString.slice(0, -1);
    }

    if (selectedCommodity || selectedCountry) {
      fetch(queryString, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedGeoJsonData = { ...geojson };

          updatedGeoJsonData.features.forEach((feature: any) => {
            const countryName = feature.properties.ADMIN;

            const productionCountry = data.find(
              (d: any) => d.country_name === countryName
            );

            if (productionCountry) {
              feature.properties.style = {
                fillColor: "black",
              };
            } else {
              feature.properties.style = {
                fillColor: "white",
              };
            }
          });

          setGeojson(updatedGeoJsonData);
        });
    }
  }, [selectedCountry, selectedCommodity, year, productionSwitch]);

  const handleChange = (_: any, newValue: any) => {
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
            sx={{ width: "40%", background: "var(--main-text)" }}
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
            sx={{ width: "40%", background: "var(--main-text)" }}
            value={selectedCountry}
            onChange={(_event, newValue) => {
              setSelectedCountry(newValue);
            }}
            options={countries.map((obj: any) => obj.name)}
            renderInput={(params) => (
              <TextField {...params} label="Select a country" />
            )}
          />
          <button
            style={{ padding: "0 25px", fontSize: "18px" }}
            onClick={() =>
              productionSwitch === "Production"
                ? setProductionSwitch("Reserves")
                : setProductionSwitch("Production")
            }
          >
            {productionSwitch === "Production"
              ? "Switch To Reserves"
              : "Switch To Production"}
          </button>
        </div>
        {geojson && <Map key={JSON.stringify(geojson)} countries={geojson} />}
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
