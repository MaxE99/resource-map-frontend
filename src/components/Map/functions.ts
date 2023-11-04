import { LatLngExpression } from "leaflet";
import { centroid, polygon, multiPolygon } from "@turf/turf";

const calculateStrongholdCoords = (
  feature: GeoJSON.Feature,
): LatLngExpression => {
  const centroidAdjustment: { [key: string]: number[] } = {
    "United States": [39.149389, -99.94949],
    Canada: [57.347269, -102.9533],
    Norway: [61.774301, 9.482824],
  };
  if (
    Object.keys(centroidAdjustment).find(
      (entry) => entry === feature.properties?.ADMIN,
    )
  ) {
    return centroidAdjustment[feature.properties?.ADMIN] as LatLngExpression;
  }
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
