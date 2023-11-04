import { Fragment, useContext, useEffect } from "react";

import { CountryBalancePopupT } from "./types";
import { AppContext } from "../AppContextProvider";
import CountryHeader from "./CountryHeader";
import { formatNumberWithSuffix } from "./functions";

const CountryBalancePopup = ({
  feature,
  isFeatureHovered,
  setIsPopupOpen,
}: CountryBalancePopupT): JSX.Element => {
  const { setIsLoading } = useContext<any>(AppContext);

  const handleClickOutside = (event: MouseEvent) => {
    const targetElement = event.target as Element;
    if (!targetElement.closest(".countryPopup")) {
      setIsLoading(false);
      setIsPopupOpen(false); // Close the popup when clicked outside
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
      className="countryPopup"
      style={{
        top: isFeatureHovered ? "80%" : "50%",
      }}
    >
      <CountryHeader
        countryName={feature?.properties?.ADMIN}
        isHovered={isFeatureHovered}
      />
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
