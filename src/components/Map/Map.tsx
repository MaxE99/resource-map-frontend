import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const Map = ({ countries }: any): JSX.Element => {
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
    let popupText = "";
    if (feature.properties && feature.properties.ADMIN) {
      popupText += feature.properties.ADMIN;
    }
    if (feature.properties && feature.properties.amount) {
      popupText += ": " + feature.properties.amount;
    }
    layer.bindPopup(popupText);
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
      </MapContainer>
    </div>
  );
};

export default Map;
