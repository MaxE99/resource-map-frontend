import { useEffect } from "react";

import "./styles.css";
import { CountryStrongholdPopupT } from "./types";
import { StrongholdT } from "../../utils/types/api";
import { S3_FOLDER } from "../../utils/config";
import CountryHeader from "./CountryHeader";
import { slugify } from "../../utils/functions/utils";

const CountryStrongholdPopup = ({
  isFeatureHovered,
  strongholds,
  setSelectedStrongholds,
  setIsPopupOpen,
}: CountryStrongholdPopupT): JSX.Element => {
  const handleClickOutside = (event: MouseEvent) => {
    const targetElement = event.target as Element;
    if (!targetElement.closest(".countryPopup")) {
      setSelectedStrongholds([]);
      setIsPopupOpen(false);
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
      style={{ top: "50%", padding: isFeatureHovered ? "12px" : "20px" }}
    >
      <CountryHeader
        countryName={strongholds[0].country}
        isHovered={isFeatureHovered}
      />
      {strongholds
        .sort(
          (a: StrongholdT, b: StrongholdT) => Number(b.share) - Number(a.share)
        )
        .map((stronghold: StrongholdT) => (
          <div
            key={JSON.stringify(stronghold)}
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
                color: "var(--main-text)",
              }}
            >
              <img
                src={
                  S3_FOLDER +
                  `static/commodity_imgs/${slugify(stronghold.commodity)}.jpg`
                }
                className="strongholdCommodityImg"
              />
              <span
                style={{
                  color: "var(--main-text)",
                  fontWeight: 600,
                  marginRight: "5px",
                }}
              >
                {stronghold.commodity}:
              </span>
            </div>
            <span style={{ color: "var(--main-text)" }}>
              {" "}
              {Number(stronghold.share).toFixed(2)}%
            </span>
          </div>
        ))}
    </div>
  );
};

export default CountryStrongholdPopup;
