import { CountryInformationT } from "../../types/country";
import ResourceTable from "./ResourceTable";
import { slugify } from "../../functions/country";
import { COUNTRY_STYLE } from "../../styles/country";
import { DOMAIN } from "../../config";
import ImportExportTreemap from "./ImportExportTreemap";
import { useState } from "react";

const CountryInformation = ({ country }: CountryInformationT): JSX.Element => {
  const [isImportExportLoaded, setIsImportExportLoaded] =
    useState<boolean>(false);
  const [isProductionReservesLoaded, setIsProductionReservesLoaded] =
    useState<boolean>(false);

  return (
    <div style={{ padding: "20px" }}>
      <div style={COUNTRY_STYLE.COUNTRY_NAME_BOX}>
        <img
          src={
            DOMAIN + `/static/flags/${slugify(country?.properties?.ADMIN)}.png`
          }
          style={{
            height: "50px",
            marginRight: "10px",
            border: "1px solid rgba(224, 224, 224, 1)",
          }}
        />
        <div className="countryNameBox" style={{ fontSize: "45px" }}>
          {country.properties?.ADMIN}
        </div>
      </div>
      <ResourceTable
        country={country}
        isImportExportLoaded={isImportExportLoaded}
        setIsProductionReservesLoaded={setIsProductionReservesLoaded}
      />
      <ImportExportTreemap
        country={country}
        isProductionReservesLoaded={isProductionReservesLoaded}
        setIsImportExportLoaded={setIsImportExportLoaded}
      />
      {/* <div>Commodity Imports Tree Map:</div>
      <div>Commodity Exports Tree Map:</div>
      <div>GDP Chart:</div>
      <div>Resources as % of GDP Chart:</div>
      <div>Ranking: Resource Imports:</div>
      <div>Ranking: Resource Exports:</div>
      <div>Ranking: Resource Dependency:</div> */}
      {/* <div>Ease of Doing Business Index: {country.ease_of_biz}</div>
      <div>Income Group: {country.income_group}</div> */}
    </div>
  );
};

export default CountryInformation;
