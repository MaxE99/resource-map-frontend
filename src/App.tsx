import { useEffect, useState, useContext, Fragment, useRef } from "react";
import Slider from "@mui/material/Slider";
import Dialog from "@mui/material/Dialog";

import Sidebar from "./components/Sidebar/Sidebar";
import CountryInformationPopup from "./components/Country/CountryInformationPopup";
import { AppContext } from "./components/AppContextProvider";
import Map from "./components/Map/Map";
import {
  CommodityPriceT,
  CommodityT,
  GovInfoT,
  ImportExportBalanceT,
  ProductionReservesT,
} from "./utils/types/api";
import { IMPORT_EXPORT_MARKS, MARKS } from "./utils/config";
import Forms from "./components/Forms/Forms";
import { GeoJSONDataUpdateT } from "./components/Map/types";
import { DEFAULT_COMMODITIES } from "./utils/start-data";
import {
  fetchGovInfoData,
  fetchImportExportBalanceData,
  fetchPriceData,
  fetchStrongholdData,
} from "./utils/functions/api";
import {
  addDataToGeojson,
  addInformationToGeojson,
  getQueryString,
  updateGeoJSONWithBalance,
  updateGeoJSONWithStronghold,
} from "./utils/functions/utils";
import BackdropWrapper from "./components/Backdrop/BackdropWrapper";
import { DefaultCommodityT } from "./utils/types/base";

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
          .then((data: ImportExportBalanceT[]) =>
            updateGeoJSONWithBalance(data, setWorldGeojson)
          )
          .finally(() => setIsLoading(false));
      } else if (isStrongholdModeSelected) {
        fetchStrongholdData(year)
          .then((data: ProductionReservesT[]) =>
            updateGeoJSONWithStronghold(data, setWorldGeojson)
          )
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
      const addInfoProps = {
        selectedCommodity: randomCommodity.current,
        setWorldGeojson: setWorldGeojson,
        setOtherCountries: setOtherCountries,
        setWorldTotal: setWorldTotal,
      };
      addInformationToGeojson(addInfoProps);
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
      <div className="mainWrapper">
        <div className="mainOuterBox">
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
            {isLoading && <BackdropWrapper />}
          </div>
          <Slider
            className="mainSlider"
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
          <CountryInformationPopup feature={selectedCountry} />
        </Dialog>
      </div>
    </Fragment>
  );
};

export default App;
