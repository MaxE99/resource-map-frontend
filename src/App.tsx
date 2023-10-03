import {
  useEffect,
  useState,
  useContext,
  CSSProperties,
  Fragment,
  useRef,
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
  ProductionReservesT,
} from "./types/api";
import { addDataToGeojson, getColor, getQueryString } from "./functions/app";
import {
  fetchGovInfoData,
  fetchImportExportBalanceData,
  fetchPriceData,
  fetchStrongholdData,
} from "./functions/api";
import { APP_STYLE } from "./styles/app";
import { BASE_STYLE } from "./styles/base";
import { IMPORT_EXPORT_MARKS, MARKS } from "./config";
import Forms from "./components/Forms/Forms";
import { GeoJSONDataUpdateT } from "./types/map";
import LoadingProgress from "./components/LoadingProgress/LoadingProgress";
import Backdrop from "./components/Backdrop/Backdrop";
import {
  DEFAULT_COMMODITIES,
  COUNTRIES_DATA,
  DefaultCommodityT,
} from "./start-data";

const App = (): JSX.Element | null => {
  const randomCommodity = useRef<DefaultCommodityT>(
    DEFAULT_COMMODITIES[Math.floor(Math.random() * 10)]
  );
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityT>(
    randomCommodity.current.commodity
  );
  const [year, setYear] = useState<number>(
    randomCommodity.current.gov_info.year
  );
  const [govInfo, setGovInfo] = useState<GovInfoT | null>(
    randomCommodity.current.gov_info
  );
  const [prices, setPrices] = useState<CommodityPriceT[]>(
    randomCommodity.current.prices
  );
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);
  const [worldGeojson, setWorldGeojson] = useState<
    GeoJSON.FeatureCollection | undefined
  >(undefined);

  const [otherCountries, setOtherCountries] = useState<string | undefined>(
    undefined
  );
  const [worldTotal, setWorldTotal] = useState<string | undefined>(undefined);
  const [noDataFound, setNoDataFound] = useState<boolean>(false);
  const [isSidebarLoading, setIsSidebarLoading] = useState<boolean>(false);
  const [isBalanceModeSelected, setIsBalanceModeSelected] =
    useState<boolean>(false);
  const [isStrongholdModeSelected, setIsStrongholdModeSelected] =
    useState<boolean>(false);

  const {
    selectedCountry,
    isShowingProduction,
    dialogIsOpen,
    isLoading,
    setDialogIsOpen,
    setIsLoading,
  } = useContext<any>(AppContext);

  useEffect(() => {
    if (isBalanceModeSelected || isStrongholdModeSelected) {
      setNoDataFound(false);
    }
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
      } else if (isStrongholdModeSelected) {
        fetchStrongholdData(year)
          .then((data) => {
            const updatedGeoJsonData = { ...worldGeojson };
            updatedGeoJsonData?.features?.forEach((feature: any) => {
              const countryName = feature.properties.ADMIN;

              const countryStrongholds = data.filter(
                (stronghold) => stronghold.country_name === countryName
              );
              if (countryStrongholds.length) {
                feature.properties.strongholds = countryStrongholds;
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
  }, [
    selectedCommodity,
    year,
    isShowingProduction,
    isBalanceModeSelected,
    isStrongholdModeSelected,
  ]);

  useEffect(() => {
    if (initialLoadComplete) {
      const fetchSidebarData = async () => {
        setIsSidebarLoading(true);
        await Promise.all([
          fetchGovInfoData(year, selectedCommodity.name).then(
            (data: GovInfoT[]) => setGovInfo(data?.length ? data[0] : null)
          ),
          fetchPriceData(selectedCommodity.name).then(
            (data: CommodityPriceT[]) => setPrices(data)
          ),
        ])
          .catch((error) =>
            console.error("Error fetching sidebar data:", error)
          )
          .finally(() => setIsSidebarLoading(false));
      };
      fetchSidebarData();
    }
  }, [year, selectedCommodity]);

  useEffect(() => {
    if (!initialLoadComplete) {
      const updatedGeoJsonData = { ...COUNTRIES_DATA };

      const totalAmount = randomCommodity.current.production.find(
        (entry: ProductionReservesT) => entry.country_name === "World total"
      )?.amount;

      const otherCountriesAmount = randomCommodity.current.production.find(
        (entry: ProductionReservesT) => entry.country_name === "Other countries"
      )?.amount;

      let metric = "";

      updatedGeoJsonData?.features?.forEach((feature: any) => {
        const countryName = feature.properties.ADMIN;

        const productionCountry = randomCommodity.current.production.find(
          (entry: ProductionReservesT) => entry.country_name === countryName
        );

        if (
          productionCountry &&
          Number(productionCountry.amount) !== 0 &&
          totalAmount
        ) {
          metric = productionCountry.metric;
          if (isNaN(Number(productionCountry.amount))) {
            feature.properties.amount = "Unknown Amount";
            feature.properties.metric = metric;
            feature.properties.style = {
              fillColor: "red",
            };
          } else {
            const share = parseFloat(
              //@ts-ignore
              ((productionCountry.amount / totalAmount) * 100).toFixed(2)
            );
            feature.properties.style = {
              fillColor: getColor(share),
            };
            feature.properties.amount = productionCountry.amount;
            feature.properties.metric = metric;
            feature.properties.share = share;
          }
        } else {
          feature.properties.amount = null;
          feature.properties.style = {
            fillColor: "white",
          };
        }
      });
      //@ts-ignore
      setWorldGeojson(updatedGeoJsonData);
      setOtherCountries(
        `${
          otherCountriesAmount !== "nan" ? otherCountriesAmount : undefined
        } ${metric}`
      );
      setWorldTotal(
        `${totalAmount !== "nan" ? totalAmount : undefined} ${metric}`
      );
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // if directly set in the starter useEffect hook, it causes API calls from the other two useEffect hooks.
    worldGeojson && setInitialLoadComplete(true);
  }, [worldGeojson]);

  const handleChange = (_: any, newValue: any) => {
    setYear(newValue);
  };

  return (
    <Fragment>
      <div style={APP_STYLE.WRAPPER as CSSProperties}>
        <div style={APP_STYLE.OUTER_BOX}>
          <Forms
            selectedCommodity={selectedCommodity}
            isBalanceModeSelected={isBalanceModeSelected}
            isStrongholdModeSelected={isStrongholdModeSelected}
            setSelectedCommodity={setSelectedCommodity}
            setIsBalanceModeSelected={setIsBalanceModeSelected}
            setIsStrongholdModeSelected={setIsStrongholdModeSelected}
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
              isStrongholdModeSelected={isStrongholdModeSelected}
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
                      position: "relative",
                      zIndex: 500,
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
              overflow: isLoading ? "hidden" : "auto",
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
