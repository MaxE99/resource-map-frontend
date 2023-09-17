import {
  useEffect,
  useState,
  useContext,
  CSSProperties,
  Fragment,
} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Dialog from "@mui/material/Dialog";

import Sidebar from "./components/Sidebar/Sidebar";
import CountryInformation from "./components/Country/CountryInformation";
import { AppContext } from "./components/AppContextProvider";
import Map from "./components/Map/Map";
import {
  CommodityT,
  CountryT,
  GovInfoT,
  ProductionReservesT,
} from "./types/api";
import { getColor, getQueryString } from "./functions/app";
import {
  fetchCommodityData,
  fetchCountryData,
  fetchGovInfoData,
} from "./functions/api";
import { APP_STYLE } from "./styles/app";
import { BASE_STYLE } from "./styles/base";
import { DOMAIN, MARKS, OTHER_VIZ_OPTIONS } from "./config";
import { Backdrop, CircularProgress } from "@mui/material";
import Dropdown from "./components/Dropdown/Dropdown";
import Forms from "./components/Forms/Forms";

const App = (): JSX.Element => {
  const [selectedCommodity, setSelectedCommodity] = useState<
    CommodityT | undefined
  >(undefined);
  const [commodities, setCommodities] = useState<CommodityT[]>([]);
  const [year, setYear] = useState<number>(2018);
  const [worldGeojson, setWorldGeojson] = useState<GeoJSON.FeatureCollection>();
  const [govInfo, setGovInfo] = useState<GovInfoT | null>(null);
  const [otherCountries, setOtherCountries] = useState<string>();
  const [worldTotal, setWorldTotal] = useState<string>();
  const [otherViz, setOtherViz] = useState<string | undefined>(undefined);

  const {
    selectedCountry,
    isShowingProduction,
    dialogIsOpen,
    setDialogIsOpen,
    isLoading,
    setIsLoading,
  } = useContext<any>(AppContext);

  useEffect(() => {
    let isCommodityDataLoaded = false;
    let isCountryDataLoaded = false;
    fetchCommodityData()
      .then((data: CommodityT[]) => setCommodities(data))
      .catch((error) => console.error("Error fetching commodity data:", error))
      .finally(() => {
        isCommodityDataLoaded = true;
        if (isCommodityDataLoaded && isCountryDataLoaded) {
          setIsLoading(false);
        }
      });

    fetchCountryData()
      .then((data: CountryT[]) => {
        const filteredArray = data.filter(
          (obj: CountryT) => obj.geojson !== null,
        );
        const features = filteredArray.map((obj: CountryT) => obj.geojson);
        const featureCollection: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: features,
        };
        setWorldGeojson(featureCollection);
      })
      .catch((error) => console.error("Error fetching country data:", error))
      .finally(() => {
        isCountryDataLoaded = true;
        if (isCommodityDataLoaded && isCountryDataLoaded) {
          setIsLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    const queryString = getQueryString(
      isShowingProduction,
      selectedCommodity,
      year,
    );

    if (selectedCommodity?.name) {
      let isGovDataLoaded = false;
      let isResourceDataLoaded = false;

      setIsLoading(true);
      fetchGovInfoData(year, selectedCommodity.name)
        .then((data: GovInfoT[]) =>
          data?.length ? setGovInfo(data[0]) : setGovInfo(null),
        )
        .catch((error) => console.error("Error fetching gov info data:", error))
        .finally(() => {
          isGovDataLoaded = true;
          if (isGovDataLoaded && isResourceDataLoaded) {
            setIsLoading(false);
          }
        });

      fetch(queryString, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data: ProductionReservesT[]) => {
          const updatedGeoJsonData = {
            ...worldGeojson,
          };
          const totalAmount = data.find(
            (entry: ProductionReservesT) =>
              entry.country_name === "World total",
          )?.amount;
          const otherCountriesAmount = data.find(
            (entry: ProductionReservesT) =>
              entry.country_name === "Other countries",
          )?.amount;
          let metric = "";
          updatedGeoJsonData?.features?.forEach((feature: any) => {
            const countryName = feature.properties.ADMIN;

            const productionCountry = data.find(
              (entry: ProductionReservesT) =>
                entry.country_name === countryName,
            );

            if (productionCountry && totalAmount) {
              const percentage = parseFloat(
                ((productionCountry.amount / totalAmount) * 100).toFixed(2),
              );

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

          //@ts-ignore
          setWorldGeojson(updatedGeoJsonData);
          setOtherCountries(`${otherCountriesAmount} ${metric}`);
          setWorldTotal(`${totalAmount} ${metric}`);
        })
        .catch((error) => console.error("Error fetching country data:", error))
        .finally(() => {
          isResourceDataLoaded = true;
          if (isGovDataLoaded && isResourceDataLoaded) {
            setIsLoading(false);
          }
        });
    }
  }, [selectedCommodity, year, isShowingProduction]);

  const handleChange = (_: any, newValue: any) => {
    setYear(newValue);
  };

  return (
    <Fragment>
      <div style={APP_STYLE.WRAPPER as CSSProperties}>
        <div style={APP_STYLE.OUTER_BOX}>
          {/*
            <Autocomplete
              sx={{
                width: "40%",
                background: BASE_STYLE.COLOR_PALLETE.TEXT,
                zIndex: 999,
              }}
              value={selectedCommodity}
              onChange={(_event, newValue) => {
                newValue && setSelectedCommodity(newValue);
              }}
              options={commodities.sort((a: CommodityT, b: CommodityT) =>
                a.name.localeCompare(b.name),
              )}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Select a commodity" />
              )}
              renderOption={(props, option) => (
                <li {...props} style={{ padding: 0 }}>
                  <div style={APP_STYLE.COMMODITY_BOX}>
                    <img
                      src={DOMAIN + "/static/" + option.img_path + ".jpg"}
                      alt={option.name}
                      style={APP_STYLE.IMAGE}
                    />
                    {option.name}
                  </div>
                </li>
              )}
            />
            */}
          <Forms
            commodities={commodities}
            selectedCommodity={selectedCommodity}
            setSelectedCommodity={setSelectedCommodity}
            OTHER_VIZ_OPTIONS={OTHER_VIZ_OPTIONS}
            otherViz={otherViz}
            setOtherViz={setOtherViz}
          />
          {/*
            <Autocomplete
              sx={{
                width: "40%",
                background: BASE_STYLE.COLOR_PALLETE.TEXT,
                zIndex: 999,
              }}
              value={otherViz}
              onChange={(_event, newValue) => {
                newValue && setOtherViz(newValue);
              }}
              options={OTHER_VIZ_OPTIONS}
              renderInput={(params) => (
                <TextField {...params} label="Show other visualization" />
              )}
            />

            */}
          <Map
            key={JSON.stringify(worldGeojson)}
            countries={worldGeojson}
            selectedCommodity={selectedCommodity}
            otherCountries={otherCountries}
            worldTotal={worldTotal}
          />
          <Slider
            sx={{
              ...APP_STYLE.SLIDER,
              "& .MuiSlider-rail": { boxShadow: BASE_STYLE.BOX_SHADOW },
            }}
            value={year}
            min={2018}
            max={2022}
            marks={MARKS}
            step={1}
            onChange={handleChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => value.toString()}
            aria-label="Year Slider"
          />
        </div>
        <Sidebar
          key={JSON.stringify(govInfo)}
          commodity={selectedCommodity}
          govInfo={govInfo}
        />
        <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
          <CountryInformation country={selectedCountry} />
        </Dialog>
      </div>
      <Backdrop
        sx={{ background: BASE_STYLE.COLOR_PALLETE.BACKGROUND, zIndex: 1000 }}
        open={isLoading}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={DOMAIN + "/static/test-logo.jpg"}
            style={{
              borderRadius: "8px",
              width: "150px",
              marginBottom: "20px",
            }}
          ></img>
          <CircularProgress color="secondary" />
        </div>
      </Backdrop>
    </Fragment>
  );
};

export default App;
