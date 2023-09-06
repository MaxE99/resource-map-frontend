// Function to generate a color based on percentage

import { API } from "../config";
import { CommodityT } from "../types/api";

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

export { getColor, getQueryString };
