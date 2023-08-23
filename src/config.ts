const DOMAIN = "http://localhost:3000";

const API = {
  COUNTRIES: DOMAIN + "/countries",
  COMMODITIES: DOMAIN + "/commodities",
  PRODUCTION: DOMAIN + "/production",
  RESERVES: DOMAIN + "/reserves",
  GOV_INFO: DOMAIN + "/gov_info",
  IMPORTS: DOMAIN + "/imports",
  EXPORTS: DOMAIN + "/exports",
} as const;

export { API };
