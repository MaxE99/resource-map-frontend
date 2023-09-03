import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { useContext, useState } from "react";

import CountryResourcePopup from "./CountryResourcePopup";
import { Tooltip } from "@mui/material";
import { AppContext } from "../Sidebar/AppContextProvider";

const Map = ({
  countries,
  selectedCommodity,
  otherCountries,
  worldTotal,
}: any): JSX.Element => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<any>();
  const { isShowingProduction, setIsShowingProduction } =
    useContext<any>(AppContext);

  const bounds: [[number, number], [number, number]] = [
    [-90, -180], // Bottom left corner of the world
    [90, 180], // Top right corner of the world
  ];

  const getFeatureStyle = (feature: any) => {
    return {
      fillColor: feature?.properties?.style?.fillColor || "white",
      weight: 1,
      color: "black",
      fillOpacity: 0.5,
    };
  };

  const onEachCountryFeature = (feature: any, layer: any) => {
    layer.on("click", () => {
      setPopupOpen(true);
      setSelectedCountry(feature);
    });
  };

  return (
    <MapContainer
      style={{ height: "75vh", borderRadius: "20px" }}
      center={[30, 0]}
      minZoom={2}
      maxZoom={5}
      bounds={bounds}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        noWrap={true}
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {countries && (
        <GeoJSON
          onEachFeature={onEachCountryFeature}
          data={countries}
          style={getFeatureStyle}
        />
      )}

      {popupOpen && (
        <Popup position={[0, 0]} onClose={() => setPopupOpen(false)}>
          <CountryResourcePopup
            feature={selectedCountry}
            commodity={selectedCommodity}
          />
        </Popup>
      )}
      <Tooltip
        style={{ zIndex: 998 }}
        title={isShowingProduction ? "Show Reserves" : "Show Production"}
        placement="right"
      >
        <button
          style={{
            position: "absolute",
            // top: "85px",
            // left: "12px",
            top: 0,
            right: 0,
            // width: "33px",
            // height: "33px",
            cursor: "pointer",
            // backgroundColor: "#fff",
            // border: "2px solid rgba(0,0,0,0.2)",
            background: "white",
            padding: "20px",
            zIndex: 998,
            borderBottomLeftRadius: "20px",
            border: "1px solid",
            fontSize: "15px",
          }}
          onClick={() => setIsShowingProduction(!isShowingProduction)}
        >
          {isShowingProduction ? "Production" : "Reserves"}
        </button>
      </Tooltip>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          background: "white",
          padding: "20px",
          zIndex: 998,
          borderTopRightRadius: "20px",
          border: "1px solid",
          fontSize: "15px",
        }}
      >
        <span style={{ marginRight: "20px" }}>
          Other Countries: {otherCountries}
        </span>
        <span>World Total: {worldTotal}</span>
      </div>
    </MapContainer>
  );
};

export default Map;
