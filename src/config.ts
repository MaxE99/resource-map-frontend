import { MarksT } from "./types/base";

const DOMAIN = "http://localhost:8000/";

const API = {
  COUNTRIES: DOMAIN + "api/countries/",
  COMMODITIES: DOMAIN + "api/commodities/",
  PRODUCTION: DOMAIN + "api/production/",
  RESERVES: DOMAIN + "api/reserves/",
  GOV_INFO: DOMAIN + "api/gov_info/",
  IMPORTS: DOMAIN + "api/imports/",
  EXPORTS: DOMAIN + "api/exports/",
  PRICES: DOMAIN + "api/prices/",
  BALANCE: DOMAIN + "api/balance/",
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

const IMPORT_EXPORT_MARKS: MarksT[] = [
  {
    value: 1995,
    label: "1995",
  },
  {
    value: 1996,
    label: "",
  },
  {
    value: 1997,
    label: "",
  },
  {
    value: 1998,
    label: "",
  },
  {
    value: 1999,
    label: "",
  },
  {
    value: 2000,
    label: "2000",
  },
  {
    value: 2001,
    label: "",
  },
  {
    value: 2002,
    label: "",
  },
  {
    value: 2003,
    label: "",
  },
  {
    value: 2004,
    label: "",
  },
  {
    value: 2005,
    label: "2005",
  },
  {
    value: 2006,
    label: "",
  },
  {
    value: 2007,
    label: "",
  },
  {
    value: 2008,
    label: "",
  },
  {
    value: 2009,
    label: "",
  },
  {
    value: 2010,
    label: "2010",
  },
  {
    value: 2011,
    label: "",
  },
  {
    value: 2012,
    label: "",
  },
  {
    value: 2013,
    label: "",
  },
  {
    value: 2014,
    label: "",
  },
  {
    value: 2015,
    label: "2015",
  },
  {
    value: 2016,
    label: "",
  },
  {
    value: 2017,
    label: "",
  },
  {
    value: 2018,
    label: "",
  },
  {
    value: 2019,
    label: "",
  },
  {
    value: 2020,
    label: "2020",
  },
  {
    value: 2021,
    label: "",
  },
];

export { API, DOMAIN, MARKS, IMPORT_EXPORT_MARKS };
