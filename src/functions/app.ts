// Function to generate a color based on percentage

import { API } from "../config";
import { CommodityT, ProductionReservesT } from "../types/api";
import { GeoJSONDataUpdateT } from "../types/map";
import { fetchGovInfoData } from "./api";

const getColor = (percentage: number) => {
  // Calculate the darkness based on the percentage (0% => 70, 100% => 0)
  const darkness = 70 - percentage * 4;
  // Use a fixed saturation and hue for black (0% saturation and hue)
  const saturation = 0;
  const hue = 0;
  // Convert the HSL color to RGB format
  const rgbColor = `hsl(${hue}, ${saturation}%, ${darkness}%)`;
  return rgbColor;
};

const getQueryString = (
  isShowingProduction: boolean,
  selectedCommodity: CommodityT | undefined,
  year: number | undefined
): string => {
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

  return queryString;
};

const addDataToGeojson = async (props: GeoJSONDataUpdateT) => {
  if (props.selectedCommodity?.name) {
    try {
      const [govInfoData, productionReservesData] = await Promise.all([
        fetchGovInfoData(props.year, props.selectedCommodity.name),
        fetch(props.queryString, { method: "GET" }).then((response) =>
          response.json()
        ),
      ]);

      const govInfo = govInfoData?.length ? govInfoData[0] : null;

      const updatedGeoJsonData = { ...props.worldGeojson };

      const totalAmount = productionReservesData.find(
        (entry: ProductionReservesT) => entry.country_name === "World total"
      )?.amount;

      const otherCountriesAmount = productionReservesData.find(
        (entry: ProductionReservesT) => entry.country_name === "Other countries"
      )?.amount;

      let metric = "";

      updatedGeoJsonData?.features?.forEach((feature: any) => {
        const countryName = feature.properties.ADMIN;

        const productionCountry = productionReservesData.find(
          (entry: ProductionReservesT) => entry.country_name === countryName
        );

        if (productionCountry && totalAmount) {
          const percentage = parseFloat(
            ((productionCountry.amount / totalAmount) * 100).toFixed(2)
          );

          metric = productionCountry.metric;
          feature.properties.style = {
            fillColor: getColor(percentage),
          };
          feature.properties.amount = `${productionCountry.amount} ${metric} - ${percentage}%`;
        } else {
          feature.properties.amount = null;
          feature.properties.style = {
            fillColor: "white",
          };
        }
      });
      props.setGovInfo(govInfo);
      //@ts-ignore
      props.setWorldGeojson(updatedGeoJsonData);
      props.setOtherCountries(`${otherCountriesAmount} ${metric}`);
      props.setWorldTotal(`${totalAmount} ${metric}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};

export { getColor, getQueryString, addDataToGeojson };
