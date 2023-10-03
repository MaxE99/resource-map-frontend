import { LatLngExpression } from "leaflet";
import { centroid, polygon, multiPolygon } from "@turf/turf";

const calculateStrongholdCoords = (
  feature: GeoJSON.Feature
): LatLngExpression => {
  let turfedCoordinates: any = [];
  if (feature.geometry.type === "Polygon") {
    turfedCoordinates = polygon(feature.geometry.coordinates);
  } else if (feature.geometry.type === "MultiPolygon") {
    turfedCoordinates = multiPolygon(feature.geometry.coordinates);
  }
  const coords = centroid(turfedCoordinates)?.geometry?.coordinates ?? [0, 0];
  return [coords[1], coords[0]] as LatLngExpression;
};

export { calculateStrongholdCoords };
