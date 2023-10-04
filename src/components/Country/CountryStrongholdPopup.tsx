import { useEffect } from "react";
import "./styles.css";

import { CountryStrongholdT } from "./types";
import { ProductionReservesT } from "../../utils/types/api";
import { DOMAIN } from "../../utils/config";
import CountryHeader from "./CountryHeader";
import { slugify } from "../../utils/functions/utils";

const CountryStrongholdPopup = ({
  strongholds,
  setSelectedStrongholds,
  setIsPopupOpen,
}: CountryStrongholdT): JSX.Element => {
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
    <div className="countryPopup" style={{ top: "50%" }}>
      <CountryHeader countryName={strongholds[0].country_name} />
      {strongholds
        .sort(
          //@ts-ignore // strongholds can only hold ProductionReservesT that have a share
          (a: ProductionReservesT, b: ProductionReservesT) => b.share - a.share
        )
        .map((stronghold: ProductionReservesT) => (
          <div
            key={JSON.stringify(stronghold)}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "18px",
              }}
            >
              <img
                src={
                  DOMAIN +
                  `/static/commodity_imgs/${slugify(
                    stronghold.commodity_name
                  )}.jpg`
                }
                className="strongholdCommodityImg"
              />
              <span style={{ fontWeight: 600, marginRight: "5px" }}>
                {stronghold.commodity_name}:
              </span>
            </div>
            <span> {Number(stronghold.share).toFixed(2)}%</span>
          </div>
        ))}
    </div>
  );
};

export default CountryStrongholdPopup;
