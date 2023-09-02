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
  const [govInfo, setGovInfo] = useState<any>();
  const [otherCountries, setOtherCountries] = useState<number>();
  const [worldTotal, setWorldTotal] = useState<number>();

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

  // Function to generate a color based on percentage
  function getColor(percentage: number) {
    // Calculate the darkness based on the percentage (0% => 70, 100% => 0)
    const darkness = 70 - percentage * 4;

    // Use a fixed saturation and hue for black (0% saturation and hue)
    const saturation = 0;
    const hue = 0;

    // Convert the HSL color to RGB format
    const rgbColor = `hsl(${hue}, ${saturation}%, ${darkness}%)`;

    return rgbColor;
  }

  useEffect(() => {
    let queryString = "";
    if (productionSwitch === "Production") {
      queryString = `${API.PRODUCTION}?`;
    } else {
      queryString = `${API.RESERVES}?`;
    }

    if (selectedCountry?.name) {
      queryString += `country=${selectedCountry.name}&`;
    }

    if (selectedCommodity?.name) {
      queryString += `commodity=${selectedCommodity.name}&`;
    }

    if (year) {
      queryString += `year=${year}&`;
    }

    // Remove the trailing '&' if there's at least one parameter
    if (queryString.endsWith("&")) {
      queryString = queryString.slice(0, -1);
    }

    if (selectedCommodity?.name || selectedCountry?.name) {
      fetch(queryString, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          const totalAmount = data.reduce(
            (accumulator: any, productionCountry: any) =>
              accumulator + parseFloat(productionCountry.amount),
            0
          );

          const otherCountriesAmount = data.find(
            (d: any) => d.country_name === "Other countries"
          )?.amount;

          setOtherCountries(otherCountriesAmount);

          const worldTotalAmount = data.find(
            (d: any) => d.country_name === "World total"
          )?.amount;

          setWorldTotal(worldTotalAmount);

          const updatedGeoJsonData = { ...geojson };

          updatedGeoJsonData.features.forEach((feature: any) => {
            const countryName = feature.properties.ADMIN;

            const productionCountry = data.find(
              (d: any) => d.country_name === countryName
            );

            if (productionCountry) {
              const percentage = (
                (productionCountry.amount / totalAmount) *
                100
              ).toFixed(2);

              feature.properties.style = {
                fillColor: getColor(percentage),
              };
              feature.properties.amount = `${productionCountry.amount} ${productionCountry.metric} - ${percentage}%`;
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

  useEffect(() => {
    if (selectedCommodity?.name) {
      fetch(
        `${API.GOV_INFO}?commodity=${selectedCommodity.name}&year=${year}`,
        {
          method: "GET", // Specify the GET method
        }
      )
        .then((response) => response.json())
        .then((data) => setGovInfo(data));
    }
  }, [selectedCommodity, year]);

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
            options={commodities.sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
            )}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Select a commodity" />
            )}
            renderOption={(props, option: any) => (
              <li {...props}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={"http://localhost:8000/static/" + option.img_path}
                    alt={option.name}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                    }}
                  />
                  {option.name}
                </div>
              </li>
            )}
          />
          <Autocomplete
            sx={{ width: "40%", background: "var(--main-text)" }}
            value={selectedCountry}
            onChange={(_event, newValue) => {
              setSelectedCountry(newValue);
            }}
            options={countries}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Select a country" />
            )}
            renderOption={(props, option: any) => (
              <li {...props}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={"http://localhost:8000/static/" + option.flag_path}
                    alt={option.name}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                    }}
                  />
                  {option.name}
                </div>
              </li>
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
        <div style={{ display: "flex", marginBottom: "20px", color: "white" }}>
          <span style={{ marginRight: "20px" }}>
            Other Countries: {otherCountries}
          </span>
          <span>World Total: {worldTotal}</span>
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

      <Sidebar commodity={selectedCommodity} govInfo={govInfo} />
    </div>
  );
};

export default App;
