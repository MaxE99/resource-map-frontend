import { MarksT } from "./types/base";

const DOMAIN = "https://api.resource-map.com/";

const S3_FOLDER = "https://s3.us-east-2.amazonaws.com/resource-map.com-images/";

const API = {
  PRODUCTION: DOMAIN + "production",
  RESERVES: DOMAIN + "reserves",
  GOV_INFO: DOMAIN + "gov_info",
  PRICES: DOMAIN + "prices",
  BALANCE: DOMAIN + "balance",
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

const IMAGE_SOURCES = [
  {
    name: "Barite",
    link: "https://en.wikipedia.org/wiki/Baryte#/media/File:Barite_-_Cerro_Warihuyn,_Miraflores,_Huamalies,_Huanuco,_Peru.jpg",
  },
  {
    name: "Bauxite Alumina",
    link: "https://en.wikipedia.org/wiki/Bauxite#/media/File:Bauxite_with_unweathered_rock_core._C_021.jpg",
  },
  {
    name: "Cesium",
    link: "https://en.wikipedia.org/wiki/Caesium#/media/File:Cesium.jpg",
  },
  {
    name: "Clays",
    link: "https://en.wikipedia.org/wiki/Clay#/media/File:Clay-ss-2005.jpg",
  },
  {
    name: "Diamond Industrials",
    link: "https://en.wikipedia.org/wiki/Diamond#/media/File:Diamond_blade_very_macro.jpg",
  },
  {
    name: "Feldspar",
    link: "https://en.wikipedia.org/wiki/Feldspar#/media/File:Feldspar-Group-291254.jpg",
  },
  {
    name: "Fluorspar",
    link: "https://en.wikipedia.org/wiki/Fluorite#/media/File:Closeup_of_Fluorite.jpg",
  },
  {
    name: "Garnet",
    link: "https://en.wikipedia.org/wiki/Garnet#/media/File:Garnet_Andradite20.jpg",
  },
  {
    name: "Graphite",
    link: "https://en.wikipedia.org/wiki/Graphite#/media/File:Graphite-233436.jpg",
  },
  {
    name: "Gypsum",
    link: "https://en.wikipedia.org/wiki/Gypsum#/media/File:Gypse_Caresse.jpg",
  },
  {
    name: "Iron Oxide Pigments",
    link: "https://en.wikipedia.org/wiki/Iron_oxide#/media/File:Almindeligt_rust_-_jernoxid.jpg",
  },
  {
    name: "Iron Steel",
    link: "https://en.wikipedia.org/wiki/Steel#/media/File:%D0%A0%D0%B0%D0%B7%D0%BB%D0%B8%D0%B2%D0%BA%D0%B0_%D0%B6%D0%B8%D0%B4%D0%BA%D0%BE%D0%B3%D0%BE_%D1%87%D1%83%D0%B3%D1%83%D0%BD%D0%B0.jpg",
  },
  {
    name: "Iron Steel Slag",
    link: "https://en.wikipedia.org/wiki/Slag#/media/File:Slag_from_iron_ore_melting.jpg",
  },
  {
    name: "Kyanite",
    link: "https://en.wikipedia.org/wiki/Kyanite#/media/File:Kyanite_crystals.jpg",
  },
  {
    name: "Lime",
    link: "https://en.wikipedia.org/wiki/Lime_(material)#/media/File:Limestone_quarry.jpg",
  },
  {
    name: "Magnesium Compounds",
    link: "https://en.wikipedia.org/wiki/Magnesium_compounds#/media/File:Magnija_perhlor%C4%81ts_02.jpg",
  },
  {
    name: "Mica",
    link: "https://en.wikipedia.org/wiki/Mica#/media/File:Mica_(6911818878).jpg",
  },
  {
    name: "Peat",
    link: "https://en.wikipedia.org/wiki/Peat#/media/File:Peat_(49302157252).jpg",
  },
  {
    name: "Platinum",
    link: "https://en.wikipedia.org/wiki/Platinum#/media/File:Platinum_crystals.jpg",
  },
  {
    name: "Pumice",
    link: "https://en.wikipedia.org/wiki/Pumice#/media/File:Teidepumice.jpg",
  },
  {
    name: "Quartz",
    link: "https://en.wikipedia.org/wiki/Quartz#/media/File:Quartz_Br%C3%A9sil.jpg",
  },
  {
    name: "Salt",
    link: "https://en.wikipedia.org/wiki/Salt#/media/File:DeadSeaIsrael5.jpg",
  },
  {
    name: "Sand Gravel",
    link: "https://en.wikipedia.org/wiki/Gravel#/media/File:Gravel_on_a_beach_in_Thirasia,_Santorini,_Greece.jpg",
  },
  {
    name: "Stone Crushed",
    link: "https://en.wikipedia.org/wiki/Crushed_stone#/media/File:20mm-aggregate.jpg",
  },
  {
    name: "Stone Dimensions",
    link: "https://en.wikipedia.org/wiki/Dimension_stone#/media/File:Slabs_of_granite_(Berlin_2008).jpg",
  },
  {
    name: "Talc",
    link: "https://en.wikipedia.org/wiki/Talc#/media/File:Talc-177589.jpg",
  },
  {
    name: "Zeolites",
    link: "https://en.wikipedia.org/wiki/Zeolite#/media/File:Stilbite-Ca-Natrolite-Laumontite-247898.jpg",
  },
  { name: "Other Commodity Images", link: "https://images-of-elements.com" },
];

export { API, DOMAIN, S3_FOLDER, MARKS, IMPORT_EXPORT_MARKS, IMAGE_SOURCES };
