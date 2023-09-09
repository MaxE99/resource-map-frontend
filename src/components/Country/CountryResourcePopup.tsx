import {
  useContext,
  useEffect,
  useState,
  Fragment,
  CSSProperties,
} from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import ResourcePlot from "./ResourcePlot";
import { AppContext } from "../AppContextProvider";
import { CountryResourcePopupT } from "../../types/country";
import { ProductionReservesT } from "../../types/api";
import { COUNTRY_STYLE } from "../../styles/country";
import { BASE_STYLE } from "../../styles/base";
import { fetchProductionData, fetchReservesData } from "../../functions/api";
import { DOMAIN } from "../../config";
import { slugify } from "../../functions/country";
import { MAP_STYLE } from "../../styles/map";

const CountryResourcePopup = ({
  feature,
  commodity,
  setPopupOpen,
}: CountryResourcePopupT): JSX.Element => {
  const [productionData, setProductionData] = useState<ProductionReservesT[]>();
  const [reserveData, setReserveData] = useState<ProductionReservesT[]>();
  const { setDialogIsOpen, setIsLoading } = useContext<any>(AppContext);

  useEffect(() => {
    if (feature?.properties) {
      setIsLoading(true);
      fetchProductionData(undefined, commodity.name, feature.properties.ADMIN)
        .then((data: ProductionReservesT[]) => {
          const sortedData = data.sort(
            (a: ProductionReservesT, b: ProductionReservesT) => a.year - b.year
          );
          setProductionData(sortedData);
        })
        .catch((error) =>
          console.error("Error fetching production data:", error)
        );

      fetchReservesData(undefined, commodity.name, feature.properties.ADMIN)
        .then((data: ProductionReservesT[]) => {
          const sortedData = data.sort(
            (a: ProductionReservesT, b: ProductionReservesT) => a.year - b.year
          );
          setReserveData(sortedData);
        })
        .catch((error) => console.error("Error fetching reserves data:", error))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    const targetElement = event.target as Element;
    if (!targetElement.closest(".countryResourcePopup")) {
      setPopupOpen(false); // Close the popup when clicked outside
    }
  };

  // Add a click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="countryResourcePopup"
      style={MAP_STYLE.POPUP as CSSProperties}
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
      {productionData && productionData?.length > 0 && (
        <Fragment>
          <div style={{ marginTop: "10px", fontWeight: 600 }}>
            Production By Year In {productionData[0].metric}:
          </div>
          <ResourcePlot data={productionData} />
        </Fragment>
      )}
      {reserveData && reserveData?.length > 0 && (
        <Fragment>
          <div style={{ marginTop: "20px", fontWeight: 600 }}>
            Reserves By Year In {reserveData[0].metric}:
          </div>
          <ResourcePlot data={reserveData} />
        </Fragment>
      )}
      {/* <div style={{ marginTop: "20px" }}>Net Import/Export Balance:</div>
      <div style={{ marginTop: "20px" }}>Share Of Total Exports:</div>
      <div style={{ marginTop: "20px" }}>Share Of Resource Exports:</div>
      <div style={{ marginTop: "20px" }}>
        Correlation between Price/Production and GDP:
      </div> */}
    </div>
  );
};

export default CountryResourcePopup;
