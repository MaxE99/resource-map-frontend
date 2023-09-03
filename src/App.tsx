import { useEffect, useState, useContext } from "react";
import Map from "./components/Map/Map";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Dialog from "@mui/material/Dialog";

import { API } from "./config";
import Sidebar from "./components/Sidebar/Sidebar";
import CountryInformation from "./components/Sidebar/CountryInformation";
import { AppContext } from "./components/Sidebar/AppContextProvider";

const App = (): JSX.Element => {
  const [selectedCommodity, setSelectedCommodity] = useState<any>();
  const [commodities, setCommodities] = useState<any>([]);
  const [year, setYear] = useState<number>(2018);
  const [geojson, setGeojson] = useState<any>();
  const [productionSwitch, setProductionSwitch] =
    useState<string>("Production");
  const [govInfo, setGovInfo] = useState<any>();
  const [otherCountries, setOtherCountries] = useState<number>();
  const [worldTotal, setWorldTotal] = useState<number>();
  const [otherViz, setOtherViz] = useState<any>();
  const { selectedCountry, setSelectedCountry } = useContext<any>(AppContext);

  const otherVizOptions = [
    "Commodity Export Dependency",
    "Commodity Import Depdency",
    "High Potential For Increasing Resource Revenue",
    "Resource Import/Export Balance",
    "Total Resource Imports in $",
    "Total Resource Exports in $",
    "Control Over Resources",
  ];

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

    if (selectedCommodity?.name) {
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
  }, [selectedCommodity, year, productionSwitch]);

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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "30px 30px 0",
      }}
    >
      <div
        style={{ width: "65%", height: "calc(100vh - 60px)", display: "block" }}
      >
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
            value={otherViz}
            onChange={(_event, newValue) => {
              setOtherViz(newValue);
            }}
            options={otherVizOptions}
            renderInput={(params) => (
              <TextField {...params} label="Show other visualization" />
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
        {geojson && (
          <Map
            key={JSON.stringify(geojson)}
            countries={geojson}
            selectedCommodity={selectedCommodity}
          />
        )}
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
      <Dialog
        open={selectedCountry}
        onClose={() => setSelectedCountry(undefined)}
      >
        <CountryInformation country={selectedCountry} />
      </Dialog>
    </div>
  );
};

export default App;
