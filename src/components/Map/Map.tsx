import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import { API } from "../../config";

const Map = (): JSX.Element => {
  const [countries, setCountries] = useState<any>();
  const bounds: [[number, number], [number, number]] = [
    [-90, -180], // Bottom left corner of the world
    [90, 180], // Top right corner of the world
  ];

  useEffect(() => {
    fetch(API.GEOJSON, {
      method: "GET", // Specify the GET method
    })
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <div>
      <MapContainer
        style={{ height: "50rem", borderRadius: "20px" }}
        center={[30, 0]}
        zoom={2}
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
            pathOptions={{ color: "black", weight: 1, fillOpacity: 0 }}
            data={countries}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
