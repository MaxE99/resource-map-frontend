import {
  useEffect,
  useState,
  useContext,
  CSSProperties,
  Fragment,
} from "react";
import Slider from "@mui/material/Slider";
import Dialog from "@mui/material/Dialog";

import Sidebar from "./components/Sidebar/Sidebar";
import CountryInformation from "./components/Country/CountryInformation";
import { AppContext } from "./components/AppContextProvider";
import Map from "./components/Map/Map";
import { CommodityPriceT, CommodityT, GovInfoT } from "./types/api";
import { addDataToGeojson, getQueryString } from "./functions/app";
import {
  fetchCommodityData,
  fetchCountryData,
  fetchPriceData,
} from "./functions/api";
import { APP_STYLE } from "./styles/app";
import { BASE_STYLE } from "./styles/base";
import { MARKS, OTHER_VIZ_OPTIONS } from "./config";
import Forms from "./components/Forms/Forms";
import { GeoJSONDataUpdateT } from "./types/map";

const App = (): JSX.Element | null => {
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityT>({
    id: 45,
    name: "Gold",
    info: "",
    img_path: "commodity_imgs/gold.jpg",
    companies: [
      "Newmont Corporation",
      "Barrick Gold Corporation",
      "AngloGold Ashanti Limited",
      "Polyus",
      "Kinross Gold Corporation",
    ],
  });
  const [commodities, setCommodities] = useState<CommodityT[]>([]);
  const [year, setYear] = useState<number>(
    [2018, 2019, 2020, 2021, 2022][Math.floor(Math.random() * 5)],
  );
  const [worldGeojson, setWorldGeojson] = useState<
    GeoJSON.FeatureCollection | undefined
  >(undefined);
  const [govInfo, setGovInfo] = useState<GovInfoT | null>(null);
  const [otherCountries, setOtherCountries] = useState<string | undefined>(
    undefined,
  );
  const [worldTotal, setWorldTotal] = useState<string | undefined>(undefined);
  const [otherViz, setOtherViz] = useState<string | undefined>(undefined);
  const [prices, setPrices] = useState<CommodityPriceT[]>([]);
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);
  const [noDataFound, setNoDataFound] = useState<boolean>(false);
  const [isSidebarLoading, setIsSidebarLoading] = useState<boolean>(false);

  const {
    selectedCountry,
    isShowingProduction,
    dialogIsOpen,
    setDialogIsOpen,
    setIsLoading,
  } = useContext<any>(AppContext);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [commodityData, countryData] = await Promise.all([
          fetchCommodityData(),
          fetchCountryData(),
        ]);

        if (!isMounted) {
          return;
        }

        const filteredCountryData = countryData.filter(
          (obj) => obj.geojson !== null,
        );
        const features = filteredCountryData.map((obj) => obj.geojson);
        const featureCollection: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: features,
        };

        const randomCommodity =
          commodityData[Math.floor(Math.random() * commodityData.length)];
        setSelectedCommodity(randomCommodity);
        setCommodities(commodityData);
        setWorldGeojson(featureCollection);

        const queryString = getQueryString(
          isShowingProduction,
          randomCommodity,
          year,
        );

        const dataUpdateProps: GeoJSONDataUpdateT = {
          selectedCommodity: randomCommodity,
          queryString: queryString,
          worldGeojson: featureCollection,
          year: year,
          setGovInfo: setGovInfo,
          setOtherCountries: setOtherCountries,
          setWorldTotal: setWorldTotal,
          setWorldGeojson: setWorldGeojson,
          setNoDataFound: setNoDataFound,
        };

        const [_, pricesData]: [void, CommodityPriceT[]] = await Promise.all([
          addDataToGeojson(dataUpdateProps),
          fetchPriceData(randomCommodity.name),
        ]);

        setPrices(pricesData);
        setIsLoading(false);
        setInitialLoadComplete(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (initialLoadComplete && worldGeojson) {
      const queryString = getQueryString(
        isShowingProduction,
        selectedCommodity,
        year,
      );
      setIsLoading(true);

      const dataUpdateProps: GeoJSONDataUpdateT = {
        selectedCommodity: selectedCommodity,
        queryString: queryString,
        worldGeojson: worldGeojson,
        year: year,
        setGovInfo: setGovInfo,
        setOtherCountries: setOtherCountries,
        setWorldTotal: setWorldTotal,
        setWorldGeojson: setWorldGeojson,
        setNoDataFound: setNoDataFound,
      };

      addDataToGeojson(dataUpdateProps).finally(() => setIsLoading(false));
    }
  }, [selectedCommodity, year, isShowingProduction]);

  useEffect(() => {
    if (initialLoadComplete && selectedCommodity) {
      setIsSidebarLoading(true);
      fetchPriceData(selectedCommodity.name)
        .then((data: CommodityPriceT[]) => setPrices(data))
        .catch((error) => console.error("Error fetching price data:", error))
        .finally(() => setIsSidebarLoading(false));
    }
  }, [selectedCommodity]);

  const handleChange = (_: any, newValue: any) => {
    setYear(newValue);
  };

  return (
    <Fragment>
      {worldGeojson ? (
        <div style={APP_STYLE.WRAPPER as CSSProperties}>
          <div style={APP_STYLE.OUTER_BOX}>
            <Forms
              commodities={commodities}
              selectedCommodity={selectedCommodity}
              setSelectedCommodity={setSelectedCommodity}
              OTHER_VIZ_OPTIONS={OTHER_VIZ_OPTIONS}
              otherViz={otherViz}
              setOtherViz={setOtherViz}
            />
            <Map
              key={JSON.stringify(worldGeojson)}
              countries={worldGeojson}
              selectedCommodity={selectedCommodity}
              otherCountries={otherCountries}
              worldTotal={worldTotal}
              noDataFound={noDataFound}
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
            prices={prices}
            isLoading={isSidebarLoading}
          />
          <Dialog
            sx={{
              "& .MuiDialog-paperScrollPaper": {
                maxWidth: "90%",
                width: "800px",
                height: "calc(100% - 64px)",
              },
            }}
            open={dialogIsOpen}
            onClose={() => setDialogIsOpen(false)}
          >
            <CountryInformation country={selectedCountry} />
          </Dialog>
        </div>
      ) : null}
    </Fragment>
  );
};

export default App;
