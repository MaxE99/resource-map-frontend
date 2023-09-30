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
import {
  CommodityPriceT,
  CommodityT,
  GovInfoT,
  ImportExportBalanceT,
} from "./types/api";
import { addDataToGeojson, getQueryString } from "./functions/app";
import {
  fetchCommodityData,
  fetchCountryData,
  fetchGovInfoData,
  fetchImportExportBalanceData,
  fetchPriceData,
} from "./functions/api";
import { APP_STYLE } from "./styles/app";
import { BASE_STYLE } from "./styles/base";
import { IMPORT_EXPORT_MARKS, MARKS } from "./config";
import Forms from "./components/Forms/Forms";
import { GeoJSONDataUpdateT } from "./types/map";
import LoadingProgress from "./components/LoadingProgress/LoadingProgress";
import Backdrop from "./components/Backdrop/Backdrop";

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
  const [year, setYear] = useState<number>(2022);
  const [worldGeojson, setWorldGeojson] = useState<
    GeoJSON.FeatureCollection | undefined
  >(undefined);
  const [govInfo, setGovInfo] = useState<GovInfoT | null>(null);
  const [otherCountries, setOtherCountries] = useState<string | undefined>(
    undefined
  );
  const [worldTotal, setWorldTotal] = useState<string | undefined>(undefined);
  const [prices, setPrices] = useState<CommodityPriceT[]>([]);
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);
  const [noDataFound, setNoDataFound] = useState<boolean>(false);
  const [isSidebarLoading, setIsSidebarLoading] = useState<boolean>(false);
  const [isBalanceModeSelected, setIsBalanceModeSelected] =
    useState<boolean>(false);
  // const [isStrongholdModeSelected, setIsStrongholdModeSelected] =
  //   useState<boolean>(false);

  const {
    selectedCountry,
    isShowingProduction,
    dialogIsOpen,
    isLoading,
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
          (obj) => obj.geojson !== null
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
          year
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
      setIsLoading(true);
      if (isBalanceModeSelected) {
        fetchImportExportBalanceData(year, undefined)
          .then((data) => {
            const updatedGeoJsonData = { ...worldGeojson };
            updatedGeoJsonData?.features?.forEach((feature: any) => {
              const countryName = feature.properties.ADMIN;

              const countryBalance = data.find(
                (entry: ImportExportBalanceT) =>
                  entry.country_name === countryName
              );
              if (countryBalance) {
                feature.properties.total_commodity_imports =
                  countryBalance.total_commodity_imports;
                feature.properties.total_commodity_exports =
                  countryBalance.total_commodity_exports;
                feature.properties.style = {
                  fillColor:
                    Number(countryBalance.total_commodity_exports) >
                    Number(countryBalance.total_commodity_imports)
                      ? "green"
                      : "red",
                };
              }
            });
            //@ts-ignore
            setWorldGeojson(updatedGeoJsonData);
          })
          .finally(() => setIsLoading(false));
      } else {
        const queryString = getQueryString(
          isShowingProduction,
          selectedCommodity,
          year
        );
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
    }
  }, [selectedCommodity, year, isShowingProduction, isBalanceModeSelected]);

  useEffect(() => {
    const fetchSidebarData = async () => {
      setIsSidebarLoading(true);
      await Promise.all([
        fetchGovInfoData(year, selectedCommodity.name).then(
          (data: GovInfoT[]) => setGovInfo(data?.length ? data[0] : null)
        ),
        fetchPriceData(selectedCommodity.name).then((data: CommodityPriceT[]) =>
          setPrices(data)
        ),
      ])
        .catch((error) => console.error("Error fetching sidebar data:", error))
        .finally(() => setIsSidebarLoading(false));
    };
    fetchSidebarData();
  }, [year, selectedCommodity]);

  const handleChange = (_: any, newValue: any) => {
    setYear(newValue);
  };

  return (
    <Fragment>
      <div style={APP_STYLE.WRAPPER as CSSProperties}>
        <div style={APP_STYLE.OUTER_BOX}>
          <Forms
            commodities={commodities}
            selectedCommodity={selectedCommodity}
            isBalanceModeSelected={isBalanceModeSelected}
            setSelectedCommodity={setSelectedCommodity}
            setIsBalanceModeSelected={setIsBalanceModeSelected}
          />
          <div style={{ position: "relative" }}>
            <Map
              key={JSON.stringify(worldGeojson)}
              countries={worldGeojson}
              selectedCommodity={selectedCommodity}
              otherCountries={otherCountries}
              worldTotal={worldTotal}
              noDataFound={noDataFound}
              isBalanceModeSelected={isBalanceModeSelected}
            />
            {isLoading && (
              <Backdrop
                children={[
                  <div
                    key="loading"
                    style={{
                      display: "flex",
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <LoadingProgress />
                  </div>,
                ]}
              />
            )}
          </div>
          <Slider
            sx={{
              ...APP_STYLE.SLIDER,
              "& .MuiSlider-rail": { boxShadow: BASE_STYLE.BOX_SHADOW },
              zIndex: 1000,
              "& .MuiDialog-paperScrollPaper": {
                maxWidth: "90%",
                width: "800px",
                height: "calc(100% - 64px)",
              },
            }}
            value={year}
            min={isBalanceModeSelected ? 1995 : 2018}
            max={isBalanceModeSelected ? 2021 : 2022}
            marks={isBalanceModeSelected ? IMPORT_EXPORT_MARKS : MARKS}
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
    </Fragment>
  );
};

export default App;
