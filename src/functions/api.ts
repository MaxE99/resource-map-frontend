import { API } from "../config";
import {
  Commodity,
  Country,
  ProductionReserves,
  GovInfo,
  ImportExport,
} from "../types/types";

async function fetchData<T>(
  endpoint: string,
  queryParameters?: URLSearchParams
): Promise<T> {
  let url = endpoint;

  if (queryParameters) {
    url += "?" + new URLSearchParams(queryParameters);
  }

  const response = await fetch(url, {
    method: "GET",
    headers: new Headers({
      "content-type": "application/json",
    }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
}

const fetchCountryData = async (name?: string): Promise<Country[]> => {
  const queryParams = name
    ? new URLSearchParams({ name: encodeURIComponent(name) })
    : undefined;
  return fetchData<Country[]>(API.COUNTRIES, queryParams);
};

const fetchCommodityData = async (name?: string): Promise<Commodity[]> => {
  const queryParams = name
    ? new URLSearchParams({ name: encodeURIComponent(name) })
    : undefined;
  return fetchData<Commodity[]>(API.COMMODITIES, queryParams);
};

const fetchProductionData = async (
  year?: number,
  commodity?: string,
  country?: string
): Promise<ProductionReserves[]> => {
  const queryParams = new URLSearchParams();
  if (year !== undefined) {
    queryParams.append("year", year.toString());
  }
  if (commodity !== undefined) {
    queryParams.append("commodity", commodity);
  }
  if (country !== undefined) {
    queryParams.append("country", country);
  }
  return fetchData<ProductionReserves[]>(API.PRODUCTION, queryParams);
};

const fetchReservesData = async (
  year?: number,
  commodity?: string,
  country?: string
): Promise<ProductionReserves[]> => {
  const queryParams = new URLSearchParams();
  if (year !== undefined) {
    queryParams.append("year", year.toString());
  }
  if (commodity !== undefined) {
    queryParams.append("commodity", commodity);
  }
  if (country !== undefined) {
    queryParams.append("country", country);
  }
  return fetchData<ProductionReserves[]>(API.RESERVES, queryParams);
};

const fetchGovInfoData = async (
  year?: number,
  commodity?: string
): Promise<GovInfo[]> => {
  const queryParams = new URLSearchParams();
  if (year !== undefined) {
    queryParams.append("year", year.toString());
  }
  if (commodity !== undefined) {
    queryParams.append("commodity", commodity);
  }
  return fetchData<GovInfo[]>(API.GOV_INFO, queryParams);
};

const fetchImportData = async (
  year?: number,
  commodity?: string,
  country?: string
): Promise<ImportExport[]> => {
  const queryParams = new URLSearchParams();
  if (year !== undefined) {
    queryParams.append("year", year.toString());
  }
  if (commodity !== undefined) {
    queryParams.append("commodity", commodity);
  }
  if (country !== undefined) {
    queryParams.append("country", country);
  }
  return fetchData<ImportExport[]>(API.IMPORTS, queryParams);
};

const fetchExportData = async (
  year?: number,
  commodity?: string,
  country?: string
): Promise<ImportExport[]> => {
  const queryParams = new URLSearchParams();
  if (year !== undefined) {
    queryParams.append("year", year.toString());
  }
  if (commodity !== undefined) {
    queryParams.append("commodity", commodity);
  }
  if (country !== undefined) {
    queryParams.append("country", country);
  }
  return fetchData<ImportExport[]>(API.EXPORTS, queryParams);
};

export {
  fetchCountryData,
  fetchCommodityData,
  fetchProductionData,
  fetchReservesData,
  fetchGovInfoData,
  fetchImportData,
  fetchExportData,
};
