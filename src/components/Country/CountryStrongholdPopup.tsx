import { CSSProperties, useContext, useEffect } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { CountryStrongholdT } from "../../types/country";
import { AppContext } from "../AppContextProvider";
import { ProductionReservesT } from "../../types/api";
import { MAP_STYLE } from "../../styles/map";
import { DOMAIN } from "../../config";
import { slugify } from "../../functions/country";
import { COUNTRY_STYLE } from "../../styles/country";
import { BASE_STYLE } from "../../styles/base";

const CountryStrongholdPopup = ({
  strongholds,
  setSelectedStrongholds,
  setPopupOpen,
}: CountryStrongholdT): JSX.Element => {
  const { setDialogIsOpen } = useContext<any>(AppContext);

  const handleClickOutside = (event: MouseEvent) => {
    const targetElement = event.target as Element;
    if (!targetElement.closest(".countryResourcePopup")) {
      setSelectedStrongholds([]);
      setPopupOpen(false);
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
      style={{
        ...(MAP_STYLE.POPUP as CSSProperties),
        top: "50%",
      }}
    >
      <div
        style={{ ...COUNTRY_STYLE.COUNTRY_NAME_BOX, marginBottom: "20px" }}
        onClick={() => setDialogIsOpen(true)}
      >
        <img
          src={
            DOMAIN + `/static/flags/${slugify(strongholds[0].country_name)}.png`
          }
          style={{ height: "25px", marginRight: "5px" }}
        />
        <div className="countryNameBox" style={{ fontSize: "30px" }}>
          {strongholds[0].country_name}
        </div>
        <OpenInNewIcon
          sx={{
            marginLeft: "5px",
            fontSize: "15px",
            "&:hover": { color: BASE_STYLE.COLOR_PALLETE.ELEMENTS },
          }}
        />
      </div>
      {strongholds
        .sort(
          (a: ProductionReservesT, b: ProductionReservesT) => b.share - a.share
        )
        .map((stronghold: ProductionReservesT) => (
          <div
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
                style={{
                  height: "25px",
                  width: "25px",
                  marginRight: "5px",
                  borderRadius: "4px",
                  border: `2px solid ${BASE_STYLE.COLOR_PALLETE.LIGHT_GREY}`,
                }}
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
