const DOMAIN = "http://localhost:8000/api";

const API = {
  COUNTRIES: DOMAIN + "/countries",
  COMMODITIES: DOMAIN + "/commodities",
  PRODUCTION: DOMAIN + "/production",
  RESERVES: DOMAIN + "/reserves",
  GOV_INFO: DOMAIN + "/gov_info",
  IMPORTS: DOMAIN + "/imports",
  EXPORTS: DOMAIN + "/exports",
  PRICES: DOMAIN + "/prices",
} as const;

export { API };
