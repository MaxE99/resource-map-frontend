import { CSSProperties, Fragment, useContext, useEffect } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { CountryBalancePopupT } from "../../types/country";
import { AppContext } from "../AppContextProvider";
import { DOMAIN } from "../../config";
import { formatNumberWithSuffix, slugify } from "../../functions/country";
import { COUNTRY_STYLE } from "../../styles/country";
import { MAP_STYLE } from "../../styles/map";
import { BASE_STYLE } from "../../styles/base";

const CountryBalancePopup = ({
  feature,
  isFeatureBeingHoveredOver,
  setPopupOpen,
}: CountryBalancePopupT): JSX.Element => {
  const { setDialogIsOpen } = useContext<any>(AppContext);

  const handleClickOutside = (event: MouseEvent) => {
    const targetElement = event.target as Element;
    if (!targetElement.closest(".countryResourcePopup")) {
      setPopupOpen(false); // Close the popup when clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="countryResourcePopup"
      style={{
        ...(MAP_STYLE.POPUP as CSSProperties),
        top: isFeatureBeingHoveredOver ? "80%" : "50%",
      }}
    >
      <div
        style={COUNTRY_STYLE.COUNTRY_NAME_BOX}
        onClick={() => setDialogIsOpen(true)}
      >
        <img
          src={
            DOMAIN + `/static/flags/${slugify(feature?.properties?.ADMIN)}.png`
          }
          style={{ height: "25px", marginRight: "5px" }}
        />
        <div className="countryNameBox" style={{ fontSize: "30px" }}>
          {feature?.properties?.ADMIN}
        </div>
        <OpenInNewIcon
          sx={{
            marginLeft: "5px",
            fontSize: "20px",
            "&:hover": { color: BASE_STYLE.COLOR_PALLETE.ELEMENTS },
          }}
        />
      </div>
      <Fragment>
        <div style={{ margin: "5px 0" }}>
          <span style={{ fontWeight: 600 }}>Commodity Imports: </span>
          <span>
            {formatNumberWithSuffix(
              feature.properties?.total_commodity_imports
            )}
          </span>
        </div>
        <div>
          <span style={{ fontWeight: 600 }}>Commodity Exports: </span>
          <span>
            {formatNumberWithSuffix(
              feature.properties?.total_commodity_exports
            )}
          </span>
        </div>
      </Fragment>
    </div>
  );
};

export default CountryBalancePopup;
