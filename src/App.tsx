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
  const [govInfo, setGovInfo] = useState<any>();
  const [otherCountries, setOtherCountries] = useState<string>();
  const [worldTotal, setWorldTotal] = useState<string>();
  const [otherViz, setOtherViz] = useState<any>();
  const { selectedCountry, setSelectedCountry, isShowingProduction } =
    useContext<any>(AppContext);

  const otherVizOptions = [
    "Commodity Export Dependency",
    "Commodity Import Depdency",
    "High Potential For Increasing Resource Revenue",
    "Resource Import/Export Balance",
    "Total Resource Imports in $",
    "Total Resource Exports in $",
    "Control Over Resources",
  ];

  const marks = [
    {
      value: 2018,
      label: "2018",
    },
    {
      value: 2019,
      label: "2019",
    },
    {
      value: 2020,
      label: "2020",
    },
    {
      value: 2021,
      label: "2021",
    },
    {
      value: 2022,
      label: "2022",
    },
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
    if (isShowingProduction) {
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
          const updatedGeoJsonData = { ...geojson };
          const totalAmount = data.find(
            (d: any) => d.country_name === "World total"
          )?.amount;
          const otherCountriesAmount = data.find(
            (d: any) => d.country_name === "Other countries"
          )?.amount;
          let metric = "";
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

              metric = productionCountry.metric;
              feature.properties.style = {
                fillColor: getColor(percentage),
              };
              feature.properties.amount = `${productionCountry.amount} ${metric} - ${percentage}%`;
            } else {
              feature.properties.style = {
                fillColor: "white",
              };
            }
          });

          setGeojson(updatedGeoJsonData);
          setOtherCountries(`${otherCountriesAmount} ${metric}`);
          setWorldTotal(`${totalAmount} ${metric}`);
        });
    }
  }, [selectedCommodity, year, isShowingProduction]);

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
            sx={{ width: "40%", background: "var(--main-text)", zIndex: 999 }}
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
            sx={{ width: "40%", background: "var(--main-text)", zIndex: 999 }}
            value={otherViz}
            onChange={(_event, newValue) => {
              setOtherViz(newValue);
            }}
            options={otherVizOptions}
            renderInput={(params) => (
              <TextField {...params} label="Show other visualization" />
            )}
          />
        </div>
        {geojson && (
          <Map
            key={JSON.stringify(geojson)}
            countries={geojson}
            selectedCommodity={selectedCommodity}
            otherCountries={otherCountries}
            worldTotal={worldTotal}
          />
        )}
        <Slider
          sx={{
            marginTop: "30px",
            color: "#1277c4",
            height: "10px",
            "& .MuiSlider-markLabel": {
              color: "#1277c4",
              fontSize: "14px",
              fontWeight: 600,
              marginTop: "5px",
            },
          }}
          value={year}
          min={2018}
          max={2022}
          marks={marks}
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
