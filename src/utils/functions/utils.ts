import { API } from "../config";
import {
  CommodityT,
  ImportExportBalanceT,
  ProductionReservesT,
} from "../types/api";
import { COUNTRIES_DATA } from "../start-data";
import { AddGeoJSONInfoT, GeoJSONDataUpdateT } from "../types/base";
import { Dispatch, SetStateAction } from "react";

// Function to generate a color based on percentage
const getColor = (percentage: number): string => {
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

const updateGeoJSONWithStartData = (props: AddGeoJSONInfoT): void => {
  const updatedGeoJsonData = { ...COUNTRIES_DATA };

  const totalAmount = props.selectedCommodity.production.find(
    (entry: ProductionReservesT) => entry.country_name === "World total"
  )?.amount;

  const otherCountriesAmount = props.selectedCommodity.production.find(
    (entry: ProductionReservesT) => entry.country_name === "Other countries"
  )?.amount;

  let metric = "";

  updatedGeoJsonData?.features?.forEach((feature: any) => {
    const countryName = feature.properties.ADMIN;

    const productionCountry = props.selectedCommodity.production.find(
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
        const share = parseFloat(Number(productionCountry.share).toFixed(2));
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
    } ${metric}`
  );
  props.setWorldTotal(
    `${totalAmount !== "nan" ? totalAmount : undefined} ${metric}`
  );
};

const updateGeoJSONWithBalance = (
  data: ImportExportBalanceT[],
  setWorldGeojson: Dispatch<
    SetStateAction<GeoJSON.FeatureCollection | undefined>
  >
): void => {
  const updatedGeoJsonData = { ...COUNTRIES_DATA };
  updatedGeoJsonData?.features?.forEach((feature: any) => {
    const countryName = feature.properties.ADMIN;

    const countryBalance = data.find(
      (entry: ImportExportBalanceT) => entry.country_name === countryName
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
};

const updateGeoJSONWithStronghold = (
  data: ProductionReservesT[],
  setWorldGeojson: Dispatch<
    SetStateAction<GeoJSON.FeatureCollection | undefined>
  >
): void => {
  const updatedGeoJsonData = { ...COUNTRIES_DATA };
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
};

const updateGeoJSONWithCommodity = async (
  props: GeoJSONDataUpdateT
): Promise<void> => {
  if (props.selectedCommodity?.name) {
    try {
      const [productionReservesData] = await Promise.all([
        fetch(props.queryString, { method: "GET" })
          .then((response) => response.json())
          .catch((error) => console.error("Error fetching data:", error)),
      ]);

      props.setNoDataFound(productionReservesData.length ? false : true);
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
              Number(productionCountry.share).toFixed(2)
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
        } ${metric}`
      );
      props.setWorldTotal(
        `${totalAmount !== "nan" ? totalAmount : undefined} ${metric}`
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except for spaces and hyphens
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .trim(); // Trim leading and trailing whitespace
};

export {
  getQueryString,
  updateGeoJSONWithCommodity,
  updateGeoJSONWithStartData,
  slugify,
  updateGeoJSONWithBalance,
  updateGeoJSONWithStronghold,
};
