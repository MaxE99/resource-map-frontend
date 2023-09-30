import { API } from "../config";
import {
  CommodityT,
  CountryT,
  ProductionReservesT,
  GovInfoT,
  ImportExportT,
  CommodityPriceT,
  ImportExportBalanceT,
} from "../types/api";

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
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
}

const fetchCountryData = async (name?: string): Promise<CountryT[]> => {
  const queryParams = name
    ? new URLSearchParams({ name: encodeURIComponent(name) })
    : undefined;
  return fetchData<CountryT[]>(API.COUNTRIES, queryParams);
};

const fetchCommodityData = async (name?: string): Promise<CommodityT[]> => {
  const queryParams = name
    ? new URLSearchParams({ name: encodeURIComponent(name) })
    : undefined;
  return fetchData<CommodityT[]>(API.COMMODITIES, queryParams);
};

const fetchProductionData = async (
  year?: number,
  commodity?: string,
  country?: string
): Promise<ProductionReservesT[]> => {
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
  return fetchData<ProductionReservesT[]>(API.PRODUCTION, queryParams);
};

const fetchReservesData = async (
  year?: number,
  commodity?: string,
  country?: string
): Promise<ProductionReservesT[]> => {
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
  return fetchData<ProductionReservesT[]>(API.RESERVES, queryParams);
};

const fetchGovInfoData = async (
  year?: number,
  commodity?: string
): Promise<GovInfoT[]> => {
  const queryParams = new URLSearchParams();
  if (year !== undefined) {
    queryParams.append("year", year.toString());
  }
  if (commodity !== undefined) {
    queryParams.append("commodity", commodity);
  }
  return fetchData<GovInfoT[]>(API.GOV_INFO, queryParams);
};

const fetchImportData = async (
  year?: number,
  commodity?: string,
  country?: string
): Promise<ImportExportT[]> => {
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
  return fetchData<ImportExportT[]>(API.IMPORTS, queryParams);
};

const fetchExportData = async (
  year?: number,
  commodity?: string,
  country?: string
): Promise<ImportExportT[]> => {
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
  return fetchData<ImportExportT[]>(API.EXPORTS, queryParams);
};

const fetchPriceData = (commodity: string): Promise<CommodityPriceT[]> =>
  fetchData<CommodityPriceT[]>(API.PRICES, new URLSearchParams({ commodity }));

const fetchImportExportBalanceData = (
  year?: number,
  country?: string
): Promise<ImportExportBalanceT[]> => {
  const queryParams = new URLSearchParams();
  if (year !== undefined) {
    queryParams.append("year", year.toString());
  }
  if (country !== undefined) {
    queryParams.append("country", country);
  }
  return fetchData<ImportExportBalanceT[]>(API.BALANCE, queryParams);
};

export {
  fetchCountryData,
  fetchCommodityData,
  fetchProductionData,
  fetchReservesData,
  fetchGovInfoData,
  fetchImportData,
  fetchExportData,
  fetchPriceData,
  fetchImportExportBalanceData,
};
