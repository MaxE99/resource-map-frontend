import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

const Map = (): JSX.Element => {
    return (
        <div style={{ width: "70%", display: "block", padding: "100px"}}>
            <MapContainer
                style={{ height: "50rem" }}
                center={[10, 0]}
                zoom={5}
            >
                <TileLayer
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
}

export default Map;
