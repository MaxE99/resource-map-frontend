import { useContext, useEffect, useState, Fragment } from "react";

import ResourcePlot from "../Plots/ResourcePlot";
import { AppContext } from "../AppContextProvider";
import { CountryResourcePopupT } from "./types";
import { ProductionReservesT } from "../../utils/types/api";
import CountryHeader from "./CountryHeader";
import {
  fetchProductionData,
  fetchReservesData,
} from "../../utils/functions/api";
import { BASE_STYLE } from "../../utils/styles/base";

const CountryResourcePopup = ({
  feature,
  commodity,
  isFeatureHovered,
  setIsPopupOpen,
}: CountryResourcePopupT): JSX.Element | null => {
  const [productionData, setProductionData] = useState<ProductionReservesT[]>();
  const [reserveData, setReserveData] = useState<ProductionReservesT[]>();
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const { setIsLoading } = useContext<any>(AppContext);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    if (feature?.properties && !isFeatureHovered) {
      let isProductionDataLoaded = false;
      let isReservesDataLoaded = false;
      setIsLoading(true);
      fetchProductionData(undefined, commodity.name, feature.properties.ADMIN)
        .then((data: ProductionReservesT[]) => {
          const sortedData = data.sort(
            (a: ProductionReservesT, b: ProductionReservesT) => a.year - b.year,
          );
          setProductionData(sortedData);
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => {
          isProductionDataLoaded = true;
          if (isProductionDataLoaded && isReservesDataLoaded) {
            setIsLoading(false);
            setIsDataLoaded(true);
          }
        });

      fetchReservesData(undefined, commodity.name, feature.properties.ADMIN)
        .then((data: ProductionReservesT[]) => {
          const sortedData = data.sort(
            (a: ProductionReservesT, b: ProductionReservesT) => a.year - b.year,
          );
          setReserveData(sortedData);
        })
        .catch((error) => console.error("Error fetching data:", error))
        .finally(() => {
          isReservesDataLoaded = true;
          if (isProductionDataLoaded && isReservesDataLoaded) {
            setIsLoading(false);
            setIsDataLoaded(true);
          }
        });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    const targetElement = event.target as Element;
    if (!targetElement.closest(".countryPopup")) {
      setIsPopupOpen(false); // Close the popup when clicked outside
      setIsLoading(false); // needed so that if something inside the popup loads at the moment is not keeping the map in a loading state
    }
  };

  return isDataLoaded || isFeatureHovered ? (
    <div
      className="countryPopup"
      style={{
        top: isFeatureHovered ? "80%" : "50%",
        padding: isFeatureHovered ? "12px" : "20px",
        backgroundColor: "var(--main-background)",
      }}
    >
      <CountryHeader
        countryName={feature?.properties?.ADMIN}
        isHovered={isFeatureHovered}
      />
      {isFeatureHovered ? (
        <Fragment>
          {feature.properties?.amount === "Unknown Amount" && (
            <div
              style={{
                margin: "5px 0",
                fontWeight: 600,
                color: BASE_STYLE.COLOR_PALLETE.RED,
              }}
            >
              Unknown Amount
            </div>
          )}
          {feature.properties?.amount &&
            feature.properties.amount !== "Unknown Amount" && (
              <Fragment>
                <div style={{ margin: "5px 0", color: "var(--main-text)" }}>
                  <span style={{ fontWeight: 600 }}>Amount: </span>
                  <span>
                    {feature.properties.amount} {feature.properties.metric}
                  </span>
                </div>
                {!isNaN(Number(feature.properties.share)) && (
                  <div style={{ color: "var(--main-text)" }}>
                    <span style={{ fontWeight: 600 }}>Share: </span>
                    <span>{Number(feature.properties.share).toFixed(2)}%</span>
                  </div>
                )}
              </Fragment>
            )}
        </Fragment>
      ) : (
        <div
          style={{
            display: "flex",
            marginTop:
              (productionData && productionData?.length > 0) ||
              (reserveData && reserveData?.length > 0)
                ? "20px"
                : "unset",
          }}
        >
          {productionData &&
            productionData?.length > 0 &&
            productionData.every((item) => !isNaN(Number(item.amount))) && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: 600, color: "var(--main-text)" }}>
                  Production By Year In {productionData[0].metric}:
                </div>
                <ResourcePlot data={productionData} />
              </div>
            )}
          {reserveData &&
            reserveData?.length > 0 &&
            reserveData.every((item) => !isNaN(Number(item.amount))) && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <div style={{ fontWeight: 600, color: "var(--main-text)" }}>
                  Reserves By Year In {reserveData[0].metric}:
                </div>
                <ResourcePlot data={reserveData} />
              </div>
            )}
        </div>
      )}
    </div>
  ) : null;
};

export default CountryResourcePopup;
