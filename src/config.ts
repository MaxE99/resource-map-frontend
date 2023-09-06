import { MarksT } from "./types/base";

const DOMAIN = "http://localhost:8000/";

const API = {
  COUNTRIES: DOMAIN + "api/countries",
  COMMODITIES: DOMAIN + "api/commodities",
  PRODUCTION: DOMAIN + "api/production",
  RESERVES: DOMAIN + "api/reserves",
  GOV_INFO: DOMAIN + "api/gov_info",
  IMPORTS: DOMAIN + "api/imports",
  EXPORTS: DOMAIN + "api/exports",
  PRICES: DOMAIN + "api/prices",
} as const;

const MARKS: MarksT[] = [
  {
    value: 2018,
    label: "2018",
  },
  {
    value: 2019,
    label: "2019",
  },
  {
    value: 2020,
    label: "2020",
  },
  {
    value: 2021,
    label: "2021",
  },
  {
    value: 2022,
    label: "2022",
  },
];

const OTHER_VIZ_OPTIONS: string[] = [
  "Commodity Export Dependency",
  "Commodity Import Depdency",
  "High Potential For Increasing Resource Revenue",
  "Resource Import/Export Balance",
  "Total Resource Imports in $",
  "Total Resource Exports in $",
  "Control Over Resources",
];

export { API, DOMAIN, MARKS, OTHER_VIZ_OPTIONS };
