import { API } from "../config";
import {
  ImportExportBalanceResT,
  StrongholdResT,
  GovInfoResT,
  PriceResT,
  CommodityCountryDataResT,
  CountryResourceTableResT,
  TradeBalanceResT,
} from "../types/api";

async function fetchData<T>(
  endpoint: string,
  queryParameters?: URLSearchParams
): Promise<T> {
  let url = endpoint;

  if (queryParameters) {
    url += "?" + new URLSearchParams(queryParameters);
  }

  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
}

const fetchTradeBalanceData = (
  year: number
): Promise<ImportExportBalanceResT> => {
  const queryParams = new URLSearchParams({
    year: year.toString(),
  });
  return fetchData<ImportExportBalanceResT>(API.BALANCE, queryParams);
};

const fetchStrongholdData = (year: number): Promise<StrongholdResT> =>
  fetchData<StrongholdResT>(
    API.PRODUCTION,
    new URLSearchParams({ year: year.toString() })
  );

const fetchGovInfoData = async (
  year: number,
  commodity: string
): Promise<GovInfoResT> => {
  const queryParams = new URLSearchParams({
    year: year.toString(),
    commodity: commodity,
  });
  return fetchData<GovInfoResT>(API.GOV_INFO, queryParams);
};

const fetchPriceData = (commodity: string): Promise<PriceResT> =>
  fetchData<PriceResT>(API.PRICES, new URLSearchParams({ commodity }));

const fetchCommodityCountryData = async (
  commodity: string,
  country: string,
  getProductionData: boolean = true
): Promise<CommodityCountryDataResT> => {
  const queryParams = new URLSearchParams({
    commodity: commodity,
    country: country,
  });
  const endpoint = getProductionData ? API.PRODUCTION : API.RESERVES;
  return fetchData<CommodityCountryDataResT>(endpoint, queryParams);
};

const fetchCountryResourceTable = async (
  year: number,
  country: string,
  getProductionData: boolean = true
): Promise<CountryResourceTableResT> => {
  const queryParams = new URLSearchParams({
    year: year.toString(),
    country: country,
  });
  const endpoint = getProductionData ? API.PRODUCTION : API.RESERVES;
  return fetchData<CountryResourceTableResT>(endpoint, queryParams);
};

const fetchCountryTradeBalanceData = (
  country: string
): Promise<TradeBalanceResT> => {
  const queryParams = new URLSearchParams();
  if (country !== undefined) {
    queryParams.append("country", country);
  }
  return fetchData<TradeBalanceResT>(API.BALANCE, queryParams);
};

export {
  fetchGovInfoData,
  fetchPriceData,
  fetchTradeBalanceData,
  fetchStrongholdData,
  fetchCommodityCountryData,
  fetchCountryResourceTable,
  fetchCountryTradeBalanceData,
};
