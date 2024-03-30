type MapT = {
  countries: GeoJSON.GeoJsonObject | undefined;
  selectedCommodity: string;
  otherCountries: string | undefined;
  worldTotal: string | undefined;
  noDataFound: boolean;
  isBalanceModeSelected: boolean;
  isStrongholdModeSelected: boolean;
  windowWidth: number;
};

export type { MapT };
