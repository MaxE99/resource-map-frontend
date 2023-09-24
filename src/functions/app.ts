// Function to generate a color based on percentage

import { API } from "../config";
import { CommodityT, ProductionReservesT } from "../types/api";
import { GeoJSONDataUpdateT } from "../types/map";

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
  year: number | undefined,
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
      const [productionReservesData] = await Promise.all([
        fetch(props.queryString, { method: "GET" }).then((response) =>
          response.json(),
        ),
      ]);

      !productionReservesData.length && props.setNoDataFound(true);

      const updatedGeoJsonData = { ...props.worldGeojson };

      const totalAmount = productionReservesData.find(
        (entry: ProductionReservesT) => entry.country_name === "World total",
      )?.amount;

      const otherCountriesAmount = productionReservesData.find(
        (entry: ProductionReservesT) =>
          entry.country_name === "Other countries",
      )?.amount;

      let metric = "";

      updatedGeoJsonData?.features?.forEach((feature: any) => {
        const countryName = feature.properties.ADMIN;

        const productionCountry = productionReservesData.find(
          (entry: ProductionReservesT) => entry.country_name === countryName,
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
              ((productionCountry.amount / totalAmount) * 100).toFixed(2),
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
      props.setWorldGeojson(updatedGeoJsonData);
      props.setOtherCountries(
        `${
          otherCountriesAmount !== "nan" ? otherCountriesAmount : undefined
        } ${metric}`,
      );
      props.setWorldTotal(
        `${totalAmount !== "nan" ? totalAmount : undefined} ${metric}`,
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};

export { getColor, getQueryString, addDataToGeojson };
