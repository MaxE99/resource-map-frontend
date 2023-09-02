import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Popup } from "react-leaflet";
import { useState } from "react";

import CountryResourcePopup from "./CountryResourcePopup";

const Map = ({ countries, selectedCommodity }: any): JSX.Element => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<any>();

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
    <div>
      <MapContainer
        style={{ height: "50rem", borderRadius: "20px" }}
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
      </MapContainer>
    </div>
  );
};

export default Map;
