import { CountryInformationT } from "../../types/country";
import ResourceTable from "./ResourceTable";
import { slugify } from "../../functions/country";
import { COUNTRY_STYLE } from "../../styles/country";
import { DOMAIN } from "../../config";
import { FormControlLabel, Switch } from "@mui/material";
import ImportExportTreemap from "./ImportExportTable";

const CountryInformation = ({ country }: CountryInformationT): JSX.Element => {
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "20px", margin: "10px 0", fontWeight: 600 }}>
          Resource Table:
        </div>
        <FormControlLabel
          style={{ fontWeight: 600, marginRight: 0 }}
          control={<Switch color="secondary" defaultChecked />}
          label="Production"
        />
      </div>
      <ResourceTable country={country} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: "20px", margin: "10px 0", fontWeight: 600 }}>
          Import/Export Table:
        </div>
        <FormControlLabel
          style={{ fontWeight: 600, marginRight: 0 }}
          control={<Switch color="secondary" defaultChecked />}
          label="Exports"
        />
      </div>
      <ImportExportTreemap country={country} />

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
